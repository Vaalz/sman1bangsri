# Migration Guide - Frontend Components untuk Pagination

## 📝 Overview
Guide ini membantu Anda mengupdate komponen frontend yang sudah ada untuk mendukung pagination yang baru.

## ✅ Good News!
Struktur response tetap menggunakan `response.data.data`, jadi **sebagian besar kode existing tidak perlu berubah**. Namun, untuk mendapatkan benefit penuh dari pagination, ikuti panduan berikut.

---

## 🔄 Basic Migration (Backward Compatible)

### Before (Loading semua data)
```jsx
const fetchBerita = async () => {
  try {
    const response = await getBeritaList();
    setBeritaList(response.data.data || []); // ✅ Masih works!
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### After (Dengan pagination support)
```jsx
const [pagination, setPagination] = useState({
  total: 0,
  current_page: 1,
  last_page: 1,
});

const fetchBerita = async (page = 1) => {
  try {
    const response = await getBeritaList({ 
      page, 
      per_page: 10 
    });
    
    setBeritaList(response.data.data || []);
    
    // Store pagination info
    setPagination({
      total: response.data.total,
      current_page: response.data.current_page,
      last_page: response.data.last_page,
    });
  } catch (error) {
    console.error('Error:', error);
  }
};
```

---

## 🎯 Complete Examples

### 1. BeritaPage.jsx - Public Page dengan Pagination

```jsx
import { useState, useEffect } from 'react';
import { Box, Container, Grid, CircularProgress, Pagination } from '@mui/material';
import { getBeritaList, getImageUrl } from '../services/api';

const BeritaPage = () => {
  const [beritaList, setBeritaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchBerita();
  }, [page]); // Re-fetch when page changes

  const fetchBerita = async () => {
    setLoading(true);
    try {
      const response = await getBeritaList({ 
        page, 
        per_page: 9 // 3x3 grid
      });
      
      setBeritaList(response.data.data || []);
      setTotalPages(response.data.last_page);
    } catch (error) {
      console.error('Error fetching berita:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {beritaList.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            {/* Your card component */}
          </Grid>
        ))}
      </Grid>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination 
            count={totalPages} 
            page={page} 
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Box>
      )}
    </Container>
  );
};

export default BeritaPage;
```

### 2. AdminBerita.jsx - Admin Page dengan Pagination

```jsx
import { useState, useEffect } from 'react';
import { Box, CircularProgress, Pagination, Stack } from '@mui/material';
import CrudTable from '../../components/admin/CrudTable';
import { getAdminBerita, createBerita, updateBerita, deleteBerita } from '../../services/api';

function AdminBerita() {
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const perPage = 15;

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getAdminBerita({ 
        page, 
        per_page: perPage 
      });
      
      setBerita(response.data.data || []);
      setTotalPages(response.data.last_page);
      setTotalItems(response.data.total);
    } catch (err) {
      console.error('Error fetching berita:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleDelete = async (row) => {
    if (window.confirm(`Hapus berita "${row.judul}"?`)) {
      try {
        await deleteBerita(row.id);
        
        // If current page becomes empty after delete, go to previous page
        if (berita.length === 1 && page > 1) {
          setPage(page - 1);
        } else {
          fetchData();
        }
      } catch (err) {
        alert('Gagal menghapus data');
      }
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (editingId) {
        await updateBerita(editingId, data);
      } else {
        await createBerita(data);
        // Go to last page after create to see new item
        const newTotalPages = Math.ceil((totalItems + 1) / perPage);
        setPage(newTotalPages);
      }
      fetchData();
    } catch (err) {
      console.error('Error:', err);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <CrudTable
        data={berita}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
      />

      {/* Pagination with info */}
      <Stack 
        direction="row" 
        justifyContent="space-between" 
        alignItems="center"
        mt={2}
      >
        <Box>
          Showing {((page - 1) * perPage) + 1} - {Math.min(page * perPage, totalItems)} of {totalItems} items
        </Box>
        
        {totalPages > 1 && (
          <Pagination 
            count={totalPages} 
            page={page} 
            onChange={handlePageChange}
            color="primary"
          />
        )}
      </Stack>
    </Box>
  );
}

export default AdminBerita;
```

### 3. GaleriPage.jsx - Infinite Scroll Implementation

```jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Container, Grid, CircularProgress, ImageList, ImageListItem } from '@mui/material';
import { getGaleriList, getImageUrl } from '../services/api';

const GaleriPage = () => {
  const [galeri, setGaleri] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const observer = useRef();
  const lastImageRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    loadMore();
  }, [page]);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const response = await getGaleriList({ 
        page, 
        per_page: 12 // 12 images per page (good for 3-4 column grid)
      });
      
      setGaleri(prev => [...prev, ...response.data.data]);
      setHasMore(response.data.next_page_url !== null);
    } catch (error) {
      console.error('Error loading galeri:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <ImageList variant="masonry" cols={3} gap={8}>
        {galeri.map((item, index) => {
          // Add ref to last item for infinite scroll
          if (galeri.length === index + 1) {
            return (
              <ImageListItem key={item.id} ref={lastImageRef}>
                <img
                  src={getImageUrl(item.foto)}
                  alt={item.judul}
                  loading="lazy"
                />
              </ImageListItem>
            );
          } else {
            return (
              <ImageListItem key={item.id}>
                <img
                  src={getImageUrl(item.foto)}
                  alt={item.judul}
                  loading="lazy"
                />
              </ImageListItem>
            );
          }
        })}
      </ImageList>

      {loading && (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      )}
      
      {!hasMore && galeri.length > 0 && (
        <Box textAlign="center" py={4} color="text.secondary">
          Semua galeri telah dimuat
        </Box>
      )}
    </Container>
  );
};

export default GaleriPage;
```

### 4. Load More Button (Alternative to Infinite Scroll)

```jsx
import { useState, useEffect } from 'react';
import { Box, Button, Grid, CircularProgress } from '@mui/material';
import { getPrestasiList } from '../services/api';

const PrestasiPage = () => {
  const [prestasi, setPrestasi] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await getPrestasiList({ 
        page, 
        per_page: 10 
      });
      
      setPrestasi(prev => [...prev, ...response.data.data]);
      setHasMore(response.data.next_page_url !== null);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {prestasi.map((item) => (
          <Grid item xs={12} md={6} key={item.id}>
            {/* Your content */}
          </Grid>
        ))}
      </Grid>

      {hasMore && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Button 
            variant="contained" 
            onClick={loadData}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Load More'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default PrestasiPage;
```

---

## 🛠 Custom Hooks untuk Reusability

### usePagination Hook

```javascript
// src/hooks/usePagination.js
import { useState, useEffect } from 'react';

export const usePagination = (fetchFunction, initialPerPage = 10) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage] = useState(initialPerPage);
  const [pagination, setPagination] = useState({
    total: 0,
    current_page: 1,
    last_page: 1,
    from: 0,
    to: 0,
  });

  useEffect(() => {
    fetchData();
  }, [page, perPage]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchFunction({ page, per_page: perPage });
      setData(response.data.data || []);
      setPagination({
        total: response.data.total,
        current_page: response.data.current_page,
        last_page: response.data.last_page,
        from: response.data.from,
        to: response.data.to,
      });
    } catch (err) {
      setError(err);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    fetchData();
  };

  const goToPage = (newPage) => {
    setPage(newPage);
  };

  const nextPage = () => {
    if (page < pagination.last_page) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return {
    data,
    loading,
    error,
    pagination,
    page,
    refresh,
    goToPage,
    nextPage,
    prevPage,
  };
};
```

### Usage Example

```jsx
import { usePagination } from '../hooks/usePagination';
import { getBeritaList } from '../services/api';

function BeritaPage() {
  const { 
    data: beritaList, 
    loading, 
    pagination, 
    page,
    goToPage 
  } = usePagination(getBeritaList, 9);

  if (loading) return <CircularProgress />;

  return (
    <Box>
      <Grid container spacing={3}>
        {beritaList.map(item => (
          <Grid item xs={12} md={4} key={item.id}>
            {/* Your content */}
          </Grid>
        ))}
      </Grid>

      <Pagination 
        count={pagination.last_page} 
        page={page} 
        onChange={(e, value) => goToPage(value)}
      />
    </Box>
  );
}
```

---

## 📋 Checklist Migration

- [ ] Update all list page components to handle pagination
- [ ] Add pagination controls (Pagination component, Load More, or Infinite Scroll)
- [ ] Update admin pages with pagination
- [ ] Test with different `per_page` values
- [ ] Add loading states for better UX
- [ ] Handle empty states
- [ ] Test pagination after create/delete operations
- [ ] Add "scroll to top" on page change
- [ ] Optimize images with lazy loading
- [ ] Test on mobile devices

---

## 🚀 Performance Tips

1. **Lazy Load Images**
   ```jsx
   <img src={url} loading="lazy" alt="..." />
   ```

2. **Debounce Search/Filter**
   ```javascript
   const debouncedSearch = useDebounce(searchTerm, 500);
   ```

3. **Cache dengan React Query** (Optional)
   ```javascript
   import { useQuery } from '@tanstack/react-query';
   
   const { data } = useQuery({
     queryKey: ['berita', page],
     queryFn: () => getBeritaList({ page }),
     keepPreviousData: true,
   });
   ```

4. **Virtual Scrolling** untuk list yang sangat panjang
   ```bash
   npm install react-window
   ```

---

## ❓ FAQ

### Q: Apakah kode lama akan error?
**A:** Tidak! Struktur `response.data.data` tetap sama, jadi kode lama masih berfungsi. Hanya saja data yang dimuat dibatasi per halaman.

### Q: Bagaimana jika ingin load semua data sekaligus?
**A:** Gunakan `per_page` yang besar (contoh: 1000), tapi ini tidak disarankan untuk performa.

### Q: Bagaimana cara tahu ada berapa total data?
**A:** Gunakan `response.data.total`

### Q: Pagination atau Infinite Scroll?
**A:** 
- **Pagination**: Untuk admin pages, data terstruktur
- **Infinite Scroll**: Untuk public pages, gallery, social media-like

---

## 📞 Need Help?

Jika ada kesulitan dalam migration, check:
1. Console untuk error messages
2. Network tab untuk melihat API response
3. Dokumentasi di PERFORMANCE_OPTIMIZATION.md

Happy coding! 🎉

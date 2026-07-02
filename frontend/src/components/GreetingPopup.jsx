import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Typography, Box, Button } from '@mui/material';
import { Close } from '@mui/icons-material';
import api, { getImageUrl } from '../services/api';

function GreetingPopup() {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState(null);

  useEffect(() => {
    // Skip showing on admin routes
    if (window.location.pathname.startsWith('/admin')) return;

    let cancelled = false;

    const fetch = async () => {
      try {
        const res = await api.get('/public/ucapan');
        const data = res?.data?.data || [];
        if (cancelled) return;
        if (!data || data.length === 0) return;
        const first = data[0];
        // Check localStorage to avoid repeat showing for same item
        const closedId = localStorage.getItem('greeting_popup_closed_id');
        if (closedId && String(closedId) === String(first.id)) return;
        setItem(first);
        setOpen(true);
      } catch (err) {
        // ignore
      }
    };

    fetch();

    return () => { cancelled = true; };
  }, []);

  const handleClose = () => {
    if (item?.id) localStorage.setItem('greeting_popup_closed_id', String(item.id));
    setOpen(false);
  };

  if (!item) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">{item.judul}</Typography>
        <IconButton onClick={handleClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {item.foto && (
            <Box component="img" src={getImageUrl(item.foto)} alt={item.judul} sx={{ width: '100%', borderRadius: 2, objectFit: 'cover' }} />
          )}
          {item.caption && (
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>{item.caption}</Typography>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleClose} variant="contained">Tutup</Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default GreetingPopup;

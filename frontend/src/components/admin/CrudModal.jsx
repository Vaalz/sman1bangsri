import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Avatar,
} from '@mui/material';
import { Close, CloudUpload } from '@mui/icons-material';
import { useState } from 'react';

function CrudModal({ open, onClose, onSubmit, title, fields, formData, setFormData }) {
  const [preview, setPreview] = useState({});

  const handleChange = (field) => (event) => {
    const value = event.target.type === 'file' ? event.target.files[0] : event.target.value;
    
    // Create preview for image files
    if (event.target.type === 'file' && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(prev => ({ ...prev, [field]: reader.result }));
        };
        reader.readAsDataURL(file);
      }
    }
    
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setPreview({});
  };

  const handleClose = () => {
    setPreview({});
    onClose();
  };

  const renderField = (field) => {
    if (field.type === 'select' && field.options) {
      return (
        <FormControl key={field.name} fullWidth required={field.required !== false}>
          <InputLabel>{field.label}</InputLabel>
          <Select
            name={field.name}
            label={field.label}
            value={formData[field.name] || ''}
            onChange={handleChange(field.name)}
          >
            {field.options.map((option) => {
              // Support both string options and {value, label} objects
              const optionValue = typeof option === 'string' ? option : option.value;
              const optionLabel = typeof option === 'string' ? option : option.label;
              return (
                <MenuItem key={optionValue} value={optionValue}>
                  {optionLabel}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      );
    }

    if (field.type === 'file') {
      const isImageFile = !field.accept || field.accept.includes('image');
      const maxSize = field.maxSize || (isImageFile ? '2 MB' : '5 MB');
      const fileTypes = field.fileTypes || (isImageFile ? 'JPG, PNG, GIF' : 'PDF, DOC, DOCX');
      
      return (
        <Box key={field.name}>
          <Button
            component="label"
            variant="outlined"
            startIcon={<CloudUpload />}
            fullWidth
            sx={{ mb: 1, justifyContent: 'flex-start', textTransform: 'none' }}
          >
            {field.label}
            <input
              type="file"
              hidden
              accept={field.accept || 'image/*'}
              onChange={handleChange(field.name)}
            />
          </Button>
          <Typography variant="caption" color="text.secondary" display="block">
            {formData[field.name]?.name || 'Belum ada file dipilih'}
          </Typography>
          <Typography variant="caption" color="primary" display="block" sx={{ mb: 1, fontWeight: 600 }}>
            Maksimal {maxSize} • Format: {fileTypes}
          </Typography>
          {preview[field.name] && (
            <Avatar
              src={preview[field.name]}
              variant="rounded"
              sx={{ width: 120, height: 120, mb: 1 }}
            />
          )}
        </Box>
      );
    }

    return (
      <TextField
        key={field.name}
        name={field.name}
        label={field.label}
        type={field.type || 'text'}
        multiline={field.multiline || false}
        rows={field.rows || 1}
        required={field.required !== false}
        value={formData[field.name] || ''}
        onChange={handleChange(field.name)}
        placeholder={field.placeholder || ''}
        fullWidth
        InputLabelProps={field.type === 'date' ? { shrink: true } : undefined}
      />
    );
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {title}
        <IconButton onClick={handleClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {fields.map((field) => renderField(field))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Batal</Button>
          <Button type="submit" variant="contained">
            Simpan
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default CrudModal;

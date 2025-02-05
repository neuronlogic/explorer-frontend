import { useState } from 'react';
import { Button, Popover, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useValidator } from '../../contexts/ValidatorProvider';

export default function ValidatorSetting() {
  const [open, setOpen] = useState(null);

  const openClick = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const { validators, selectedValidator, dataset, selectValidator, selectDataset } = useValidator();

  return (
    <div className="flex items-center gap-10">
      <Button
        className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6"
        onClick={openClick}
        color="inherit"
      >
        <FuseSvgIcon>heroicons-outline:cube</FuseSvgIcon>
      </Button>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 50,
          width: 200,
        }}
        classes={{
          paper: 'py-8',
        }}
      >
        <FormControl className="w-full my-8">
          <InputLabel id="dataset-select-label">Dataset</InputLabel>
          <Select
            labelId="dataset-select-label"
            label="Dataset"
            value={dataset}
            onChange={(e) => selectDataset(e.target.value)}
            id="dataset-select"
          >
            <MenuItem value="current" key="current">
              CIFAR-100
            </MenuItem>
            <MenuItem value="archived" key="archived">
              CIFAR-10 (Archived)
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl className=" w-full my-8">
          <InputLabel id="validator-select-label">Validator</InputLabel>
          <Select
            labelId="validator-select-label"
            label="Validator"
            value={selectedValidator}
            onChange={(e) => selectValidator(e.target.value)}
            id="validator-select"
          >
            {validators.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {item.name} {item.id === 0 && '(default)'}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Popover>
    </div>
  );
}

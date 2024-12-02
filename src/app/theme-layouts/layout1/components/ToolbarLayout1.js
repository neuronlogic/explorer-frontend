import { ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Hidden from '@mui/material/Hidden';
import Toolbar from '@mui/material/Toolbar';
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import clsx from 'clsx';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectFuseCurrentLayoutConfig, selectToolbarTheme } from 'app/store/fuse/settingsSlice';
import { selectFuseNavbar } from 'app/store/fuse/navbarSlice';
import { useValidator } from '../../../contexts/ValidatorProvider';
import NavbarToggleButton from '../../shared-components/NavbarToggleButton';
// import FullScreenToggle from '../../shared-components/FullScreenToggle';

function ToolbarLayout1(props) {
  const config = useSelector(selectFuseCurrentLayoutConfig);
  const navbar = useSelector(selectFuseNavbar);
  const toolbarTheme = useSelector(selectToolbarTheme);

  const { validators, selectedValidator, selectValidator } = useValidator();
  console.log(validators, selectedValidator);

  return (
    <ThemeProvider theme={toolbarTheme}>
      <AppBar
        id="fuse-toolbar"
        className={clsx('flex relative z-20 shadow-md', props.className)}
        color="default"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? toolbarTheme.palette.background.paper
              : toolbarTheme.palette.background.default,
        }}
        position="static"
      >
        <Toolbar className="flex justify-between p-0 min-h-48 md:min-h-64">
          <div className="flex px-16">
            {config.navbar.display && config.navbar.position === 'left' && (
              <>
                <Hidden lgUp>
                  <NavbarToggleButton className="w-40 h-40 p-0 mx-0 sm:mx-8" />
                </Hidden>
              </>
            )}
          </div>
          <div className="">
            <p className="text-18 sm:text-24 md:text-32 font-popp font-semibold">
              NASChain Explorer
            </p>
          </div>
          {/* <div className="flex items-center px-8 h-full overflow-x-auto">
            <FullScreenToggle />
          </div> */}
          <FormControl className=" w-[150px] py-0">
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
          {config.navbar.display && config.navbar.position === 'right' && (
            <>
              <Hidden lgDown>
                {!navbar.open && <NavbarToggleButton className="w-40 h-40 p-0 mx-0" />}
              </Hidden>

              <Hidden lgUp>
                <NavbarToggleButton className="w-40 h-40 p-0 mx-0 sm:mx-8" />
              </Hidden>
            </>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default memo(ToolbarLayout1);

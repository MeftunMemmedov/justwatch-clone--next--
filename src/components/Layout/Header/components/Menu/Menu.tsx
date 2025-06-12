'use client';
import Link from 'next/link';
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import { FaBars } from 'react-icons/fa6';
import { MouseEvent, useState } from 'react';
import Overlay from '@/components/Common/Overlay';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    className="z-80"
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    backgroundColor: '#070e17',
    color: '#999c9f',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
    ...theme.applyStyles('dark', {
      color: theme.palette.grey[300],
    }),
  },
}));

const CustomizedMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <button onClick={handleClick}>
        <FaBars className="text-gray-400 min-[250px]:text-lg text-sm" />
      </button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <ul className="flex flex-col gap-5 px-5 py-2">
          <li>
            <Link
              href="/imprint"
              className="inline-block w-full hover:text-white transition-all"
              onClick={() => {
                handleClose();
              }}
            >
              Imprint
            </Link>
          </li>
        </ul>
      </StyledMenu>
      {open && <Overlay close={handleClose} />}
    </>
  );
};

export default CustomizedMenu;

'use client';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { forwardRef, ReactElement, Ref, use, useEffect, useState } from 'react';
import { FaUserCog } from 'react-icons/fa';
import { FaUser, FaUserPlus } from 'react-icons/fa6';
import { MdEdit } from 'react-icons/md';
import {
  IoIosArrowForward,
  IoIosArrowBack,
  IoIosArrowDroprightCircle,
  IoIosCloseCircleOutline,
} from 'react-icons/io';

import { IoMailSharp } from 'react-icons/io5';
import { FcGoogle } from 'react-icons/fc';
import { TransitionProps } from '@mui/material/transitions';
import { GlobalContext } from '@/context/GlobalContext';
import AuthForm from '@/components/Form/AuthForm/AuthForm';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UserDialog = () => {
  const { userDialogOpen, setUserDialogOpen, user, setUser } = use(
    GlobalContext
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) as any;

  const [open, setOpen] = useState(false);
  const [letFullScreen, setLetFullScreen] = useState(false);

  const [activeTab, setActiveTab] = useState('main');
  const [tabTitle, setTabTitle] = useState('Main');

  const [changepasswordReqSent] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUserDialogOpen(false);
    setTimeout(() => {
      setActiveTab('main');
    }, 200);
  };

  const handlePrevTab = () => {
    if (
      activeTab === 'auth-list-login' ||
      activeTab === 'auth-list-register' ||
      activeTab === 'languages'
    ) {
      setActiveTab('main');
    }

    if (activeTab === 'sign-in') {
      setActiveTab('auth-list-login');
    }

    if (activeTab === 'sign-up') {
      setActiveTab('auth-list-register');
    }
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem('token');
  };
  useEffect(() => {
    if (activeTab === 'auth-list-login') {
      setTabTitle('Sign In');
    }

    if (activeTab === 'auth-list-register') {
      setTabTitle('Sign Up');
    }

    if (activeTab === 'main') {
      setTabTitle('Main');
    }

    if (activeTab === 'languages') {
      setTabTitle('Languages');
    }
  }, [activeTab]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth < 768) {
        setLetFullScreen(true);
      } else {
        setLetFullScreen(false);
      }
    });
  }, []);

  return (
    <>
      <button
        className={`auth-modal-btn cursor-pointer rounded-sm lg:px-5 lg:py-2 text-nowrap text-white transition-all ${user ? '' : 'lg:bg-slate-800 lg:hover:bg-slate-700'}`}
        onClick={handleClickOpen}
      >
        {user ? (
          <FaUserCog className="block text-yellow-400 min-[250px]:text-lg text-sm" />
        ) : (
          <>
            <span className="hidden lg:block">Sign In</span>
            <FaUser className="block text-gray-400 lg:hidden min-[250px]:text-lg text-sm" />
          </>
        )}
      </button>
      <Dialog
        open={open || userDialogOpen}
        slots={{ transition: Transition }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        fullScreen={letFullScreen}
      >
        <div className="bg-custom-dark1 h-screen px-9 py-5 pb-10 md:h-auto">
          <>
            <div className="flex items-center justify-between py-6 text-white">
              <div>
                {activeTab !== 'main' && (
                  <button onClick={handlePrevTab}>
                    <IoIosArrowBack />
                  </button>
                )}
              </div>
              <div className="text-sm font-bold sm:text-xl md:text-3xl">
                {tabTitle}
              </div>
              <button onClick={handleClose}>
                <IoIosCloseCircleOutline
                  size={32}
                  className="hover:scale-80 transition-all"
                />
              </button>
            </div>
            <div className="content">
              {activeTab === 'main' && (
                <>
                  {user ? (
                    <div className="text-gray-300">
                      <div className="flex items-center justify-between py-2">
                        <span className="text-3xl font-semibold">Hi</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-gray-500">{user.email}</span>
                        {changepasswordReqSent ? (
                          <>SUCCESS CHANGE REQUEST</>
                        ) : (
                          <button className="text-custom-slate1 flex items-center gap-1 hover:text-white">
                            <MdEdit className="text-sm" />
                            <span>Change Password</span>
                          </button>
                        )}
                      </div>
                      <button
                        className="my-5 block text-gray-500"
                        onClick={() => {
                          logOut();
                          setOpen(false);
                        }}
                      >
                        Log out
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {/* AUTH */}
                      <button
                        onClick={() => setActiveTab('auth-list-login')}
                        className="bg-custom-slate2 border-custom-slate2 group flex w-full items-center justify-between rounded-xl border p-5 hover:bg-transparent"
                      >
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-white p-2 group-hover:bg-gray-500">
                            <FaUser className="text-xl" />
                          </div>
                          <div className="md:text-xl text-sm font-semibold text-white">
                            Sign In
                          </div>
                        </div>
                        <IoIosArrowForward className="text-2xl text-white group-hover:translate-x-2 transition-all" />
                      </button>
                      <button
                        onClick={() => setActiveTab('auth-list-register')}
                        className="bg-custom-slate2 border-custom-slate2 group flex w-full items-center justify-between rounded-xl border p-5 hover:bg-transparent"
                      >
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-white p-2 group-hover:bg-gray-500">
                            <FaUserPlus className="text-xl" />
                          </div>
                          <div className="flex flex-col gap-1">
                            <div className="text-start md:text-xl text-sm font-semibold text-white">
                              Sign Up
                            </div>
                            <ul>
                              <li className="flex gap-1 text-start text-gray-500">
                                <IoIosArrowDroprightCircle />
                                <span className="text-xs">
                                  Your watchlist on all devices
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <IoIosArrowForward className="text-2xl text-white group-hover:translate-x-2 transition-all" />
                      </button>
                      {/* AUTH */}
                    </div>
                  )}
                </>
              )}
              {(activeTab === 'auth-list-login' ||
                activeTab === 'auth-list-register') && (
                <div className="flex flex-col items-center gap-4">
                  <button className="flex w-11/12 flex-col items-center justify-center gap-1 rounded-xl bg-white py-4 min-[375px]:flex-row min-[375px]:gap-2 md:w-3/5">
                    <FcGoogle className="text-xl" />
                    <span className="text-sm">Continue With Google</span>
                  </button>
                  <button
                    onClick={() => {
                      if (activeTab === 'auth-list-login') {
                        setActiveTab('sign-in');
                      }
                      if (activeTab === 'auth-list-register') {
                        setActiveTab('sign-up');
                      }
                    }}
                    className="flex w-11/12 flex-col items-center justify-center gap-1 rounded-xl bg-yellow-400 py-4 min-[375px]:flex-row min-[375px]:gap-2 md:w-3/5"
                  >
                    <IoMailSharp />
                    <span className="text-sm">
                      Continue With Email or Password
                    </span>
                  </button>
                </div>
              )}
              {activeTab === 'sign-in' && (
                <AuthForm
                  form="login"
                  setOpen={setOpen}
                  setActiveTab={setActiveTab}
                />
              )}
              {activeTab === 'sign-up' && (
                <AuthForm
                  form="register"
                  setOpen={setOpen}
                  setActiveTab={setActiveTab}
                />
              )}
              {activeTab === 'changepassword' && 'Change Password'}
            </div>
          </>
        </div>
      </Dialog>
    </>
  );
};

export default UserDialog;

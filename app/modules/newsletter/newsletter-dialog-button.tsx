export const NewsletterDialogButton = () => <></>;
// 'use client';
// import CloseIcon from '@mui/icons-material/Close';
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogContent,
//   IconButton,
//   Tooltip,
//   Typography,
//   useMediaQuery,
//   useTheme,
// } from '@mui/material';
// import React from 'react';
// import { NewsletterForm } from './newsletter-form';

// export interface DialogTitleProps {
//   id: string;
//   children: React.ReactNode;
//   onClose: () => void;
// }

// function DialogTitle(props: DialogTitleProps) {
//   const { children, onClose, ...other } = props;
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         m: 0,
//         p: 3,
//       }}
//       {...other}
//     >
//       <Typography variant="h2">{children}</Typography>
//       {onClose ? (
//         <Tooltip title="Close">
//           <IconButton
//             aria-label="close"
//             sx={{
//               ml: 'auto',
//               color: 'primary.main',
//             }}
//             onClick={onClose}
//           >
//             <CloseIcon />
//           </IconButton>
//         </Tooltip>
//       ) : null}
//     </Box>
//   );
// }

// /**
//  * Subscribe Dialog
//  */
// export function NewsletterDialogButton() {
//   const [open, setOpen] = React.useState(false);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   /**
//    * Sets the dialog box open on Button click
//    */

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   return (
//     <>
//       <Button
//         size="large"
//         fullWidth
//         variant="contained"
//         color="secondary"
//         onClick={handleOpen}
//       >
//         Sign up
//       </Button>

//       <Dialog
//         open={open}
//         fullWidth
//         fullScreen={isMobile}
//         maxWidth="sm"
//         onClose={handleClose}
//         aria-labelledby="subscribe-dialog-title"
//       >
//         <DialogTitle id="subscribe-dialog-title" onClose={handleClose}>
//           Newsletter Sign Up
//         </DialogTitle>
//         <DialogContent>
//           <Typography paragraph>
//             Get monthly tips and tricks about auto sport and engine technology
//             straight to your inbox. Don&apos;t miss out, sign up to our free
//             monthly newsletter.
//           </Typography>
//           <NewsletterForm source="website_dialog" />
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

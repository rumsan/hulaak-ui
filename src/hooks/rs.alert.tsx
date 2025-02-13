import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';

// Custom hook to control the alert dialog
export function useRsAlert() {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogProps, setDialogProps] = useState({
    title: 'Are you absolutely sure?',
    description:
      'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
    onConfirm: () => {},
    onCancel: () => setIsOpen(false),
  });

  // Function to show the dialog with custom props
  const showAlert = ({
    title = 'Are you absolutely sure?',
    description = 'This action cannot be undone.',
    onConfirm = () => {},
    onCancel = () => setIsOpen(false),
  }) => {
    setDialogProps({
      title,
      description,
      onConfirm,
      onCancel,
    });
    setIsOpen(true);
  };

  const RsAlert = () => {
    return (
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{dialogProps.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {dialogProps.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                dialogProps.onConfirm();
                setIsOpen(false);
              }}
            >
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  return { showAlert, RsAlert };
}

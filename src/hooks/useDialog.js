import {create} from 'zustand';

const useDialog = create(set => ({
  isOpen: false,
  title: '',
  desc: '',
  textBtnOne: 'Cancel',
  textBtnTwo: null,
  onReject: null,
  onConfirm: null,
  noGoBack: false,
  noClose: false,
  openDialog: dialogProps => set({isOpen: true, ...dialogProps}),
  closeDialog: () => set({isOpen: false}),
}));

export default useDialog;

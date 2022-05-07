import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import ModalContext from '../../contexts/modalContext';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function CustomModal() {
    const { modalState, setModalState } = useContext(ModalContext);
    const handleOpen = () => setModalState(() => {
        return {
            isOpen: true,
            msg: 'Opened modal window',
        }
    });
    const handleClose = () => setModalState(()=>{
        return {
            isOpen: false,
            msg: null,
        }
    });

    return (
            <Modal
                open={modalState.isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    {modalState.msg}
                    </Typography>
                </Box>
            </Modal>
    );
}

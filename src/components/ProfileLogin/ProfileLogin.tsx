import React, { useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Typography,
    Stack,
    Checkbox,
    FormControlLabel,
    InputAdornment,
    CircularProgress,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { ArrowBack, ChevronRight } from '@mui/icons-material';

import './ProfileLogin.css';

interface ProfileLoginProps {
    onLoginSuccess?: () => void;
}

type AuthMethod = 'phone' | 'email';

export default function ProfileLogin({ onLoginSuccess }: ProfileLoginProps) {
    const [open, setOpen] = useState(false);

    const [step, setStep] = useState<1 | 2>(1);
    const [authMethod, setAuthMethod] = useState<AuthMethod>('phone');
    const [loading, setLoading] = useState(false);

    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClose = () => {
        setOpen(false);
        setTimeout(() => {
            setStep(1);
            setLoading(false);
        }, 200);
    };

    const isStep1Valid = () => {
        if (authMethod === 'phone') return phone.length >= 10;
        return email.includes('@') && email.includes('.');
    };

    const isStep2Valid = () => {
        return name.length > 2 && termsAccepted;
    };

    const handleContinue = () => {
        setLoading(true);
        // Simulação Backend
        setTimeout(() => {
            setLoading(false);

            if (step === 1) {
                const inputVal = authMethod === 'phone' ? phone : email;
                const userExists = inputVal.includes('9999') || inputVal.includes('teste');

                if (userExists) {
                    if (onLoginSuccess) onLoginSuccess();
                    handleClose();
                } else {
                    setStep(2);
                }
            } else {
                if (onLoginSuccess) onLoginSuccess();
                handleClose();
            }
        }, 1000);
    };

    return (
        <div className="profile-login-wrapper">

            <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/login-3305943-2757111.png"
                alt="Login Illustration"
                className="login-illustration"
            />

            <h2 className="login-page-title">
                Já possui conta?
            </h2>

            <Button
                className="btn-main-action"
                onClick={() => setOpen(true)}
            >
                Entrar ou cadastrar
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="xs"
                fullScreen={fullScreen}
                className="profile-login-dialog"
                PaperProps={{
                    elevation: 0
                }}
            >
                <div className="custom-modal-header">
                    {step === 2 && (
                        <IconButton size="small" onClick={() => setStep(1)} style={{ color: 'var(--color-text-brown)' }}>
                            <ArrowBack fontSize="small" />
                        </IconButton>
                    )}
                    <span className="header-title-text">ENTRAR OU CADASTRAR</span>
                </div>

                <div className="modal-content-wrapper">

                    {step === 1 && (
                        <Box>
                            <div className="tabs-container">
                                <Button
                                    className={`tab-btn-custom ${authMethod === 'phone' ? 'active' : 'inactive'}`}
                                    onClick={() => setAuthMethod('phone')}
                                >
                                    Celular
                                </Button>
                                <Button
                                    className={`tab-btn-custom ${authMethod === 'email' ? 'active' : 'inactive'}`}
                                    onClick={() => setAuthMethod('email')}
                                >
                                    E-mail
                                </Button>
                            </div>

                            <label className="input-label">
                                {authMethod === 'phone' ? 'Qual seu celular? *' : 'Qual seu e-mail? *'}
                            </label>

                            <TextField
                                fullWidth
                                className="custom-textfield"
                                placeholder={authMethod === 'phone' ? '(00) 00000-0000' : 'Ex: joao@gmail.com'}
                                value={authMethod === 'phone' ? phone : email}
                                onChange={(e) => authMethod === 'phone' ? setPhone(e.target.value) : setEmail(e.target.value)}
                                variant="outlined"
                                autoFocus
                                InputProps={{
                                    startAdornment: authMethod === 'phone' ? (
                                        <InputAdornment position="start">
                                            <img
                                                src="https://flagcdn.com/w20/br.png"
                                                alt="Brasil"
                                                className="flag-icon"
                                            />
                                            <Typography variant="body2" fontWeight="500" color="var(--color-text-brown)">+55</Typography>
                                        </InputAdornment>
                                    ) : null
                                }}
                            />
                        </Box>
                    )}

                    {step === 2 && (
                        <Box sx={{ flex: 1 }}>
                            <div className="step-title">Estamos quase lá</div>
                            <div className="step-subtitle">
                                Só faltam dois passos agora: dados pessoais e localização.
                            </div>

                            <Stack spacing={2}>
                                <Box>
                                    <label className="input-label">Nome completo*</label>
                                    <TextField
                                        fullWidth
                                        className="custom-textfield"
                                        placeholder="Digite seu nome"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        autoFocus
                                    />
                                </Box>

                                <Box>
                                    <label className="input-label">
                                        {authMethod === 'phone' ? 'E-mail (opcional)' : 'Celular (opcional)'}
                                    </label>
                                    <TextField
                                        fullWidth
                                        className="custom-textfield"
                                        placeholder={authMethod === 'phone' ? 'email@exemplo.com' : '(00) 00000-0000'}
                                        value={authMethod === 'phone' ? email : phone}
                                        onChange={(e) => authMethod === 'phone' ? setEmail(e.target.value) : setPhone(e.target.value)}
                                    />
                                </Box>

                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={termsAccepted}
                                            onChange={(e) => setTermsAccepted(e.target.checked)}
                                            size="small"
                                            sx={{
                                                color: 'var(--color-text-light)',
                                                '&.Mui-checked': { color: 'var(--color-accent-gold)' }
                                            }}
                                        />
                                    }
                                    label={
                                        <span className="terms-label">
                                            Li e concordo com os <span className="link-highlight">Termos de uso</span> e <span className="link-highlight">Políticas de Privacidade</span>.
                                        </span>
                                    }
                                    sx={{ alignItems: 'flex-start', mt: 1, ml: 0 }}
                                />
                            </Stack>
                        </Box>
                    )}

                    <div className="footer-action-wrapper">
                        <Button
                            fullWidth
                            className="btn-continue"
                            onClick={handleContinue}
                            disabled={loading || (step === 1 ? !isStep1Valid() : !isStep2Valid())}
                            endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <ChevronRight />}
                        >
                            {loading ? 'Verificando...' : 'Continuar'}
                        </Button>
                    </div>

                </div>

                <div className="yooga-footer">
                    <span className="yooga-text">
                        Desenvolvido por{' '}
                        <a
                            href="https://github.com/magnoluis42"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="yooga-brand"
                        >
                            MagnoDev
                        </a>
                        {' '}v2026.2.1
                    </span>
                </div>
            </Dialog>
        </div>
    );
}
module.exports = (req, res, next) => {
    const role = req.headers['user_role'];

    if (role === 'admin') {
        return next();
    }

    return res.status(403).json({ error: 'Acesso negado. Apenas administradores.' });
};
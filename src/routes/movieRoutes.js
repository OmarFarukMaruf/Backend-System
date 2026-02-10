import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Movie API!' });
});

router.post('/', (req, res) => {
    res.json({ message: 'Movie created successfully!' });
});

router.push('/', (req, res) => {
    res.json({ message: 'Movie updated successfully!' });
});

router.delete('/', (req, res) => {
    res.json({ message: 'Movie deleted successfully!' });
}); 

export default router;
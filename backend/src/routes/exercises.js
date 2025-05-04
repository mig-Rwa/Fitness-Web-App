const express = require('express');
const router = express.Router();
const db = require('../config/database');
const auth = require('../middleware/auth');

// Add an exercise to a workout
router.post('/:workoutId/exercises', auth, (req, res) => {
    const { name, sets, reps, weight, rest, notes } = req.body;
    const workoutId = req.params.workoutId;

    if (!name) {
        return res.status(400).json({ status: 'error', message: 'Exercise name is required' });
    }

    db.run(
        'INSERT INTO exercises (workout_id, name, sets, reps, weight, rest, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [workoutId, name, sets, reps, weight, rest, notes],
        function(err) {
            if (err) {
                return res.status(500).json({ status: 'error', message: 'Error adding exercise' });
            }
            res.status(201).json({
                status: 'success',
                data: {
                    id: this.lastID,
                    workout_id: workoutId,
                    name, sets, reps, weight, rest, notes
                }
            });
        }
    );
});

// Edit an exercise
router.put('/exercise/:id', auth, (req, res) => {
    const { name, sets, reps, weight, rest, notes } = req.body;
    db.run(
        'UPDATE exercises SET name = ?, sets = ?, reps = ?, weight = ?, rest = ?, notes = ? WHERE id = ?',
        [name, sets, reps, weight, rest, notes, req.params.id],
        function(err) {
            if (err) {
                return res.status(500).json({ status: 'error', message: 'Error updating exercise' });
            }
            if (this.changes === 0) {
                return res.status(404).json({ status: 'error', message: 'Exercise not found' });
            }
            res.json({ status: 'success', message: 'Exercise updated' });
        }
    );
});

// Delete an exercise
router.delete('/exercise/:id', auth, (req, res) => {
    db.run('DELETE FROM exercises WHERE id = ?', [req.params.id], function(err) {
        if (err) {
            return res.status(500).json({ status: 'error', message: 'Error deleting exercise' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ status: 'error', message: 'Exercise not found' });
        }
        res.json({ status: 'success', message: 'Exercise deleted' });
    });
});

module.exports = router; 
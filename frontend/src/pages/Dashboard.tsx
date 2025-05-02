import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import {
  Box, Button, Card, CardContent, Typography, Avatar, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton, Switch, AppBar, Toolbar, CssBaseline, Modal, TextField, Fade, ListItemButton
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import TimelineIcon from '@mui/icons-material/Timeline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { getWorkouts, addWorkout, updateWorkout, deleteWorkout } from '../services/workoutService';
import { getProgress, addProgress } from '../services/progressService';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface TokenPayload {
  id: number;
  username: string;
}

const motivationalQuotes = [
  "Push yourself, because no one else is going to do it for you.",
  "Success starts with self-discipline.",
  "The body achieves what the mind believes.",
  "Don't limit your challenges. Challenge your limits.",
  "It never gets easier, you just get stronger."
];

const sections = [
  { key: 'workouts', label: 'Workouts', icon: <FitnessCenterIcon /> },
  { key: 'progress', label: 'Progress', icon: <TimelineIcon /> },
  { key: 'add', label: 'Add Workout', icon: <AddCircleIcon /> },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('workouts');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newWorkout, setNewWorkout] = useState({ name: '', description: '' });
  const token = localStorage.getItem('token');
  let username = '';
  if (token) {
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      username = decoded.username;
    } catch (e) {
      username = '';
    }
  }
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState<any[]>([]);
  const [progressLoading, setProgressLoading] = useState(true);
  const [progressError, setProgressError] = useState('');
  const [progressModalOpen, setProgressModalOpen] = useState(false);
  const [progressNotes, setProgressNotes] = useState('');
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null);
  const [progressSuccess, setProgressSuccess] = useState(false);
  const [error, setError] = useState('');
  const [workoutModalOpen, setWorkoutModalOpen] = useState(false);
  const [workoutEdit, setWorkoutEdit] = useState(false);
  const [workoutEditData, setWorkoutEditData] = useState({ name: '', description: '' });
  const [workoutSuccess, setWorkoutSuccess] = useState(false);
  const [workoutError, setWorkoutError] = useState('');

  React.useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      setLoading(true);
      setProgressLoading(true);
      try {
        const workoutData = await getWorkouts(token);
        setWorkouts(workoutData.data || []);
        const progressData = await getProgress(token);
        setProgress(progressData.data || []);
      } catch (e: any) {
        setError('Failed to load data.');
        setWorkouts([]);
        setProgress([]);
      } finally {
        setLoading(false);
        setProgressLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  // Placeholder stats and activity
  const stats = {
    workouts: 12,
    progress: 34,
    streak: 5
  };
  const recentActivity = [
    { type: 'workout', name: 'Morning Run', date: '2025-05-01' },
    { type: 'progress', name: 'Upper Body', date: '2025-04-30' },
    { type: 'workout', name: 'Yoga', date: '2025-04-29' },
  ];

  // Calculate streak (consecutive days with progress)
  const getStreak = () => {
    if (!progress.length) return 0;
    const dates = Array.from(new Set(progress.map((p: any) => p.date?.slice(0, 10)))).sort((a, b) => b.localeCompare(a));
    let streak = 1;
    for (let i = 1; i < dates.length; i++) {
      const prev = new Date(dates[i - 1]);
      const curr = new Date(dates[i]);
      if ((prev.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24) === 1) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  // Section content
  const renderSection = () => {
    switch (activeSection) {
      case 'workouts':
        return (
          <>
            {/* Quick Stats */}
            <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Card sx={{ minWidth: 180, p: 2, bgcolor: '#6366f1', color: '#fff', borderRadius: 3, boxShadow: 3, transition: 'box-shadow 0.3s', '&:hover': { boxShadow: 8 } }}>
                <CardContent>
                  <Typography variant="h6">Workouts</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>{workouts.length}</Typography>
                </CardContent>
              </Card>
              <Card sx={{ minWidth: 180, p: 2, bgcolor: '#818cf8', color: '#fff', borderRadius: 3, boxShadow: 3, transition: 'box-shadow 0.3s', '&:hover': { boxShadow: 8 } }}>
                <CardContent>
                  <Typography variant="h6">Progress</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>{progress.length}</Typography>
                </CardContent>
              </Card>
              <Card sx={{ minWidth: 180, p: 2, bgcolor: '#a5b4fc', color: '#18181b', borderRadius: 3, boxShadow: 3, transition: 'box-shadow 0.3s', '&:hover': { boxShadow: 8 } }}>
                <CardContent>
                  <Typography variant="h6">Streak</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>{getStreak()} days</Typography>
                </CardContent>
              </Card>
            </Box>
            {/* Recent Activity */}
            <Card sx={{ width: '100%', maxWidth: 600, mb: 4, borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Recent Activity</Typography>
                {loading && progressLoading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 80 }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <>
                    {workouts.length === 0 && progress.length === 0 && (
                      <Typography color="text.secondary">No activity yet. Start by adding a workout or logging progress!</Typography>
                    )}
                    {workouts.slice(0, 3).map((item, idx) => (
                      <Fade in={true} timeout={400 + idx * 100} key={item.id}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, alignItems: 'center', cursor: 'pointer', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 4, bgcolor: '#e0e7ff' } }} onClick={() => openWorkoutModal(item)}>
                          <Typography>🏋️‍♂️ {item.name}</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography sx={{ color: 'text.secondary' }}>{item.created_at?.slice(0, 10)}</Typography>
                            <Button size="small" variant="outlined" color="primary" startIcon={<AssignmentTurnedInIcon />} sx={{ ml: 1, borderRadius: 2 }} onClick={e => { e.stopPropagation(); setSelectedWorkout(item); setProgressModalOpen(true); }}>Log Progress</Button>
                          </Box>
                        </Box>
                      </Fade>
                    ))}
                    {progress.slice(0, 3).map((item, idx) => (
                      <Fade in={true} timeout={600 + idx * 100} key={item.id}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, alignItems: 'center' }}>
                          <Typography>📈 {item.notes || 'Progress logged'}</Typography>
                          <Typography sx={{ color: 'text.secondary' }}>{item.date?.slice(0, 10)}</Typography>
                        </Box>
                      </Fade>
                    ))}
                  </>
                )}
              </CardContent>
            </Card>
          </>
        );
      case 'progress':
        // Prepare chart data
        const progressByDate: Record<string, number> = {};
        progress.forEach((item: any) => {
          const date = item.date?.slice(0, 10);
          if (date) progressByDate[date] = (progressByDate[date] || 0) + 1;
        });
        const chartLabels = Object.keys(progressByDate).sort();
        const chartData = chartLabels.map(date => progressByDate[date]);
        const data = {
          labels: chartLabels,
          datasets: [
            {
              label: 'Progress Entries',
              data: chartData,
              fill: false,
              borderColor: '#6366f1',
              backgroundColor: '#818cf8',
              tension: 0.3,
            },
          ],
        };
        const options = {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: true, text: 'Progress Over Time', color: '#6366f1', font: { size: 18 } },
          },
          scales: {
            x: { ticks: { color: '#6366f1' } },
            y: { beginAtZero: true, ticks: { color: '#6366f1' } },
          },
        };
        return (
          <Card sx={{ width: '100%', maxWidth: 700, mb: 4, borderRadius: 3, boxShadow: 2 }}>
            <CardContent>
              <Box sx={{ mb: 4 }}>
                <Line data={data} options={options} />
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" sx={{ mb: 2 }}>Recent Progress</Typography>
              {progressLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 80 }}>
                  <CircularProgress />
                </Box>
              ) : progress.length === 0 ? (
                <Typography color="text.secondary">No progress entries yet. Log your first progress!</Typography>
              ) : (
                progress.slice(0, 8).map((item, idx) => (
                  <Fade in={true} timeout={400 + idx * 100} key={item.id}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, alignItems: 'center' }}>
                      <Typography>📈 {item.notes || 'Progress logged'}</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{item.date?.slice(0, 10)}</Typography>
                    </Box>
                  </Fade>
                ))
              )}
            </CardContent>
          </Card>
        );
      case 'add':
        setAddModalOpen(true);
        setActiveSection('workouts');
        return null;
      default:
        return null;
    }
  };

  // Add Workout Modal
  const handleAddWorkout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    try {
      await addWorkout(token, newWorkout.name, newWorkout.description);
      setSuccess(true);
      setAddModalOpen(false);
      setNewWorkout({ name: '', description: '' });
      // Refresh workouts
      const data = await getWorkouts(token);
      setWorkouts(data.data || []);
    } catch (e) {
      setError('Failed to add workout.');
    } finally {
      setLoading(false);
    }
  };

  // Add Progress Modal
  const handleAddProgress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !selectedWorkout) return;
    setProgressLoading(true);
    try {
      await addProgress(token, selectedWorkout.id, progressNotes);
      setProgressSuccess(true);
      setProgressModalOpen(false);
      setProgressNotes('');
      setSelectedWorkout(null);
      // Refresh progress
      const progressData = await getProgress(token);
      setProgress(progressData.data || []);
    } catch (e) {
      setProgressError('Failed to log progress.');
    } finally {
      setProgressLoading(false);
    }
  };

  // Workout details/edit modal handlers
  const openWorkoutModal = (workout: any) => {
    setSelectedWorkout(workout);
    setWorkoutEdit(false);
    setWorkoutEditData({ name: workout.name, description: workout.description });
    setWorkoutModalOpen(true);
  };
  const handleWorkoutEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !selectedWorkout) return;
    setLoading(true);
    try {
      await updateWorkout(token, selectedWorkout.id, workoutEditData.name, workoutEditData.description);
      setWorkoutSuccess(true);
      setWorkoutModalOpen(false);
      // Refresh workouts
      const data = await getWorkouts(token);
      setWorkouts(data.data || []);
    } catch (e) {
      setWorkoutError('Failed to update workout.');
    } finally {
      setLoading(false);
    }
  };
  const handleWorkoutDelete = async () => {
    if (!token || !selectedWorkout) return;
    setLoading(true);
    try {
      await deleteWorkout(token, selectedWorkout.id);
      setWorkoutSuccess(true);
      setWorkoutModalOpen(false);
      // Refresh workouts
      const data = await getWorkouts(token);
      setWorkouts(data.data || []);
    } catch (e) {
      setWorkoutError('Failed to delete workout.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', bgcolor: darkMode ? '#18181b' : '#f8fafc', minHeight: '100vh' }}>
      <CssBaseline />
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 220,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 220, boxSizing: 'border-box', bgcolor: darkMode ? '#27272a' : '#6366f1', color: '#fff', transition: 'background 0.3s' },
        }}
      >
        <Toolbar />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
          <Avatar sx={{ bgcolor: '#fff', color: '#6366f1', width: 64, height: 64, mb: 1, boxShadow: 2 }}>
            <PersonIcon fontSize="large" />
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>{username}</Typography>
        </Box>
        <Divider sx={{ my: 2, bgcolor: '#a5b4fc' }} />
        <List>
          {sections.map(section => (
            <ListItem key={section.key} disablePadding>
              <ListItemButton
                selected={activeSection === section.key}
                onClick={() => setActiveSection(section.key)}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  bgcolor: activeSection === section.key ? '#818cf8' : 'inherit',
                  color: activeSection === section.key ? '#fff' : '#e0e7ff',
                  transition: 'background 0.2s, color 0.2s',
                  '&:hover': {
                    bgcolor: '#a5b4fc',
                    color: '#18181b',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>{section.icon}</ListItemIcon>
                <ListItemText primary={section.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 2, bgcolor: '#a5b4fc' }} />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <WbSunnyIcon />
          <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} color="default" />
          <DarkModeIcon />
        </Box>
        <Button startIcon={<LogoutIcon />} onClick={handleLogout} sx={{ color: '#fff', mb: 2, borderRadius: 2, '&:hover': { bgcolor: '#a5b4fc', color: '#18181b' } }}>
          Logout
        </Button>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 4 }}>
          <Toolbar>
            <Typography variant="h4" sx={{ flexGrow: 1, color: darkMode ? '#fff' : '#18181b', fontWeight: 700 }}>
              Hey {username ? username : 'User'}!
            </Typography>
          </Toolbar>
        </AppBar>
        {renderSection()}
        {/* Motivational Quote */}
        <Fade in={true} timeout={800}>
          <Card sx={{ width: '100%', maxWidth: 600, borderRadius: 3, boxShadow: 2, mt: 2 }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontStyle: 'italic', color: '#6366f1' }}>
                "{quote}"
              </Typography>
            </CardContent>
          </Card>
        </Fade>
      </Box>
      {/* Add Workout Modal */}
      <Modal open={addModalOpen} onClose={() => setAddModalOpen(false)}>
        <Fade in={addModalOpen}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: '#fff', p: 4, borderRadius: 3, boxShadow: 6, minWidth: 320 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Add Workout</Typography>
            <form onSubmit={handleAddWorkout}>
              <TextField
                label="Workout Name"
                value={newWorkout.name}
                onChange={e => setNewWorkout({ ...newWorkout, name: e.target.value })}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Description"
                value={newWorkout.description}
                onChange={e => setNewWorkout({ ...newWorkout, description: e.target.value })}
                fullWidth
                multiline
                rows={3}
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button onClick={() => setAddModalOpen(false)} color="secondary" variant="outlined">Cancel</Button>
                <Button type="submit" variant="contained" color="primary" disabled={loading}>{loading ? <CircularProgress size={20} /> : 'Add'}</Button>
              </Box>
            </form>
          </Box>
        </Fade>
      </Modal>
      {/* Add Progress Modal */}
      <Modal open={progressModalOpen} onClose={() => setProgressModalOpen(false)}>
        <Fade in={progressModalOpen}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: '#fff', p: 4, borderRadius: 3, boxShadow: 6, minWidth: 320 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Log Progress for {selectedWorkout?.name}</Typography>
            <form onSubmit={handleAddProgress}>
              <TextField
                label="Notes"
                value={progressNotes}
                onChange={e => setProgressNotes(e.target.value)}
                fullWidth
                multiline
                rows={3}
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button onClick={() => setProgressModalOpen(false)} color="secondary" variant="outlined">Cancel</Button>
                <Button type="submit" variant="contained" color="primary" disabled={progressLoading}>{progressLoading ? <CircularProgress size={20} /> : 'Log Progress'}</Button>
              </Box>
            </form>
            {progressError && <Typography color="error" sx={{ mt: 2 }}>{progressError}</Typography>}
          </Box>
        </Fade>
      </Modal>
      {/* Workout Details/Edit Modal */}
      <Modal open={workoutModalOpen} onClose={() => setWorkoutModalOpen(false)}>
        <Fade in={workoutModalOpen}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: '#fff', p: 4, borderRadius: 3, boxShadow: 6, minWidth: 340, maxWidth: 400 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Workout Details</Typography>
            {!workoutEdit ? (
              <>
                <Typography sx={{ mb: 1 }}><b>Name:</b> {selectedWorkout?.name}</Typography>
                <Typography sx={{ mb: 1 }}><b>Description:</b> {selectedWorkout?.description || 'No description'}</Typography>
                <Typography sx={{ mb: 2 }}><b>Created:</b> {selectedWorkout?.created_at?.slice(0, 10)}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  <Button startIcon={<EditIcon />} onClick={() => setWorkoutEdit(true)} variant="outlined">Edit</Button>
                  <Button startIcon={<DeleteIcon />} onClick={handleWorkoutDelete} color="error" variant="contained">Delete</Button>
                </Box>
              </>
            ) : (
              <form onSubmit={handleWorkoutEdit}>
                <TextField
                  label="Workout Name"
                  value={workoutEditData.name}
                  onChange={e => setWorkoutEditData({ ...workoutEditData, name: e.target.value })}
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Description"
                  value={workoutEditData.description}
                  onChange={e => setWorkoutEditData({ ...workoutEditData, description: e.target.value })}
                  fullWidth
                  multiline
                  rows={3}
                  sx={{ mb: 2 }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  <Button onClick={() => setWorkoutEdit(false)} color="secondary" variant="outlined">Cancel</Button>
                  <Button type="submit" variant="contained" color="primary" disabled={loading}>{loading ? <CircularProgress size={20} /> : 'Save'}</Button>
                </Box>
              </form>
            )}
            {workoutError && <Typography color="error" sx={{ mt: 2 }}>{workoutError}</Typography>}
          </Box>
        </Fade>
      </Modal>
      {/* Success Snackbar for Progress */}
      <Snackbar open={progressSuccess} autoHideDuration={3000} onClose={() => setProgressSuccess(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <MuiAlert elevation={6} variant="filled" onClose={() => setProgressSuccess(false)} severity="success">
          Progress logged successfully!
        </MuiAlert>
      </Snackbar>
      {/* Error Snackbar */}
      <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <MuiAlert elevation={6} variant="filled" onClose={() => setError('')} severity="error">
          {error}
        </MuiAlert>
      </Snackbar>
      {/* Workout Success Snackbar */}
      <Snackbar open={workoutSuccess} autoHideDuration={3000} onClose={() => setWorkoutSuccess(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <MuiAlert elevation={6} variant="filled" onClose={() => setWorkoutSuccess(false)} severity="success">
          Workout updated!
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard; 
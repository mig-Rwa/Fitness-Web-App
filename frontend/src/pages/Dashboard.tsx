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
import { getWorkouts, addWorkout } from '../services/workoutService';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

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

  React.useEffect(() => {
    const fetchWorkouts = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const data = await getWorkouts(token);
        setWorkouts(data.data || []);
      } catch (e) {
        setWorkouts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkouts();
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
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>--</Typography>
                </CardContent>
              </Card>
              <Card sx={{ minWidth: 180, p: 2, bgcolor: '#a5b4fc', color: '#18181b', borderRadius: 3, boxShadow: 3, transition: 'box-shadow 0.3s', '&:hover': { boxShadow: 8 } }}>
                <CardContent>
                  <Typography variant="h6">Streak</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>--</Typography>
                </CardContent>
              </Card>
            </Box>
            {/* Recent Activity */}
            <Card sx={{ width: '100%', maxWidth: 600, mb: 4, borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Recent Activity</Typography>
                {loading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 80 }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  workouts.slice(0, 5).map((item, idx) => (
                    <Fade in={true} timeout={400 + idx * 100} key={item.id}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography>🏋️‍♂️ {item.name}</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>{item.created_at?.slice(0, 10)}</Typography>
                      </Box>
                    </Fade>
                  ))
                )}
              </CardContent>
            </Card>
          </>
        );
      case 'progress':
        return (
          <Card sx={{ width: '100%', maxWidth: 600, mb: 4, borderRadius: 3, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Progress Chart</Typography>
              <Box sx={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a1a1aa' }}>
                [Progress chart coming soon!]
              </Box>
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
      // Optionally show error
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
      {/* Success Snackbar */}
      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <MuiAlert elevation={6} variant="filled" onClose={() => setSuccess(false)} severity="success">
          Workout added successfully!
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard; 
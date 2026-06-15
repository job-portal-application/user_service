import express from 'express';
import { isAuth } from '../middleware/auth.js';
import { myProfile, getUserProfile, updateUserProfile, updateProfilePic, updateResume, addSkills, deleteSkills, applyForJobs, getAllApplications } from '../controllers/userController.js';
import uploadFile from '../middleware/multer.js';

const router = express.Router();

// Define your routes here
router.get('/my-profile', isAuth, myProfile);
router.get('/profile/:userId', isAuth, getUserProfile);
router.put('/update-profile/:userId', isAuth, updateUserProfile);
router.put('/update-profile-pic/:userId', isAuth, uploadFile, updateProfilePic);
router.put('/update-resume/:userId', isAuth, uploadFile, updateResume);
router.post('/skills/add', isAuth, addSkills);
router.delete('/skills/delete', isAuth, deleteSkills);
router.post('/apply/:jobId', isAuth, applyForJobs);
router.get('/applications', isAuth, getAllApplications);

export default router;
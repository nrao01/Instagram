const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load Profile Model
const Profile = require('../../models/Profile');

//Load User Model
const User = require('../../models/User');

// @route GET api/profile
// @desc Get current users profile
// @access Private
router.get('/',
    passport.authenticate('jwt', {session: false}), (req, res) => {
        Profile.findOne({user: req.user.id})
            .populate('user', ['username', 'avatar'])
            .then(profile => {
                if(!profile) {
                    return res.status(404).json('There is no profile for this user');
                }
                res.json(profile);
            })
            .catch(err => res.status(404).json(err));
    }

)

// @route GET api/profile/all
// @desc Get all profiles
// @access Public
router.get('/all', (req, res) => {
    Profile.find()
        .populate('user', ['username', 'avatar'])
        .then(profiles => {
            if(!profiles) {
                return res.status(404).json('There are no profiles');
            }
            res.json(profiles);
        })
        .catch(err => res.status(404).json({
            profile: 'There are no profiles'
        }));
});

// @route GET api/profile/username/:username
// @desc Get profile by username
// @access Public
router.get('/username/:username', (req, res) => {
    
    User.findOne({ username: req.params.username })
//       .populate('user', ['username', 'avatar'])
        .then(user_two => {
            Profile.findOne({user: user_two.id})
                .then(profile => {

                    if(!profile) {
                        res.status(404).json('There is no profile for this username');
                    }
                    res.json(profile);
                })
        .catch(err => res.status(404).json(err));
    })
});

// @route GET api/profile/user/:user_id
// @desc Get profile by user ID
// @access Public

router.get('/user/:user_id', (req, res) => {

    Profile.findOne({user: req.params.user_id})
        .populate('user', ['username', 'avatar'])
        .then(profile => {
            if(!profile) {
                res.status(404).json('There is no profile for this user');
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json({ profile: 'There is no profile for this user' }));
});

// @route POST api/profile
// @desc Create or edit user profile
// @access Private

router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        // Get fields
        const profileFields = {};
        profileFields.user = req.user.id;

        if (req.body.bio) profileFields.bio = req.body.bio;

        if (req.body.website) profileFields.website = req.body.website;

        if(req.body.story) profileFields.story = req.body.story;

        Profile.findOne({user: req.user.id})
        .then(profile => {
            if(profile) {
                Profile.findOneAndUpdate(
                    {user: req.user.id},
                    {$set: profileFields},
                    {new: true}
                ).then(profile => res.json(profile));
            }
            else {

                // Create & save new profile
                new Profile(profileFields)
                .save()
                .then(profile => res.json(profile));
                 
            }
        });
    });

// @route POST api/profile/follow/:id
// @desc Follow user
// @access Private
router.post(
    '/follow/:id',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Profile.findOne({ user: req.user.id})
        .then(profile_two => {

            Profile.findById(req.params.id)
            
                .then(profile_one => {

                    if (
                        profile_one.followers.filter(followers => followers.user.toString() === req.user.id).length > 0
                        ) {
                            return res.status(400).json('You already follow this user');
                        }

                        profile_one.followers.unshift({user: req.user.id});

                        profile_two.following.unshift({user: profile_one.user.id});
                        
                        profile_one.save().then(profile_one => res.json(profile_one));

                        profile_two.save().then(profile_two => res.json(profile_two));
                        
                })
                .catch(err => res.status(404).json('No user found'));
        });
    }
);

// @route POST api/profile/unfollow/:id
// @desc Unfollow user
// @access Private
router.post(
    '/unfollow/:id',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Profile.findOne({user: req.user.id})
        .then(profile_two => {
            Profile.findById(req.params.id)
            .then(profile_one => {
                if (
                    profile_one.followers.filter(followers => followers.user.toString() === req.user.id).length === 0
                ) {
                    return res.status(400).json('You do not follow this user');
                }
                
                // Get remove index for profile_one
                const removeIndexone = profile_one.followers
                    .map(item_one => item_one.user.toString())
                    .indexOf(req.user.id);
                
                // Get remove index for profile_two
                const removeIndextwo = profile_two.following
                    .map(item_two => item_two.user.toString())
                    .indexOf(profile_one.user.id);

                // Splice out of array
                profile_one.followers.splice(removeIndexone, 1);

                profile_two.following.splice(removeIndextwo, 1);

                // Save
                profile_one.save().then(profile_one => res.json(profile_one));

                profile_two.save().then(profile_two => res.json(profile_two));

            })
            .catch(err => res.status(404).json('User not found'));
        });
    }
);

// @route DELETE api/profile
// @desc Delete user and profile
// @access Private
router.delete(
    '/',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Profile.findOneAndRemove({ user: req.user.id }).then(() => {
            User.findOneAndRemove({ _id: req.user.id }).then(() => 
            res.json({success: true})
            );
        });
    }
);


module.exports =  router;
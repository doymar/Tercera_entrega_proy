import { Router } from "express";
import passport from "passport";
import { UserManager } from '../DAL/daos/mongo/users.mongo.js'
import { hashData, compareData, generateToken } from "../utils/utils.js";
const router = Router();

router.get('/current', passport.authenticate('jwt',{session: false}), async (req,res) =>{
  res.status(200).json({message: 'User loged', user: req.user})
})

// SIGNUP - LOGIN - PASSPORT LOCAL

router.post('/signup2',passport.authenticate('signup',{
    successRedirect: '/login',
    failureRedirect: '/signup2'
}))

router.post('/login',passport.authenticate('login'),(req,res) => {
  const {first_name, last_name, email, role} = req.user;
  const token = generateToken({first_name, last_name, email, role});
  res.cookie("token", token, { maxAge: 60000, httpOnly: true })
  .redirect('/home');
})

// SIGNUP - LOGIN - PASSPORT GITHUB

router.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }
  ));

router.get('/callback', passport.authenticate('github'), (req,res) =>{
    res.redirect('/home');
})  

// SIGNUP - LOGIN - PASSPORT GOOGLE

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),(req, res)=> {
    // Successful authentication, redirect home.
    res.redirect('/home');
  });

router.get("/signout", async(req,res) => {
    req.session.destroy(()=>{
        res.redirect("/login")
    })
})

router.post("/restaurar", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserManager.findByEmail(email);
      if (!user) {
        return res.redirect("/signup2");
      }
      const hashedPassword = await hashData(password);
      user.password = hashedPassword;
      await user.save();
      res.status(200).json({ message: "Password updated" });
    } catch (error) {
      res.status(500).json({ error });
    }
  });

export default router;
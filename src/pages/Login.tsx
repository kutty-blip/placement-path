import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, signup } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast.error("Please fill all fields"); return; }
    if (isSignup && !name) { toast.error("Please enter your name"); return; }

    const success = isSignup ? signup(name, email, password) : login(email, password);
    if (success) {
      toast.success(isSignup ? "Account created!" : "Welcome back!");
      navigate("/dashboard");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero p-4">
      <div className="bg-card rounded-2xl shadow-elevated p-8 w-full max-w-md border border-border">
        <div className="flex items-center gap-2 justify-center mb-6">
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-heading font-bold text-foreground text-xl">PlacePrep</span>
        </div>
        <h2 className="text-xl font-heading font-bold text-foreground text-center mb-1">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>
        <p className="text-muted-foreground text-sm text-center mb-6">
          {isSignup ? "Start your placement journey" : "Continue your preparation"}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div><Label>Name</Label><Input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" /></div>
          )}
          <div><Label>Email</Label><Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" /></div>
          <div><Label>Password</Label><Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" /></div>
          <Button type="submit" className="w-full gradient-primary text-primary-foreground">
            {isSignup ? "Sign Up" : "Log In"}
          </Button>
        </form>
        <p className="text-sm text-muted-foreground text-center mt-4">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button onClick={() => setIsSignup(!isSignup)} className="text-primary font-medium hover:underline">
            {isSignup ? "Log In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;

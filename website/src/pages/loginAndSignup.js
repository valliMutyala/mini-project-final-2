import '../App.css';
import axios from 'axios';
import { useContext, useState } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { useNavigate } from 'react-router-dom';
import { ShopsContext } from '../context/shopsContext';
import { useToast } from '../hooks/use-toast';
import '../styles/LandingPage.css'; // New CSS file for animations

export default function LandingPage() {
  const { setIsLoggedIn } = useContext(ShopsContext);
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', { email: formData.email, password: formData.password })
      .then(res => {
        if (res.data.message === "Login successful") {
          setIsLoggedIn(() => {
            localStorage.setItem('email', JSON.stringify(formData.email));
            return {
              email: formData.email,
              isLogged : true,
              isAdmin: res.data.isAdmin
            }
          });
          navigate('/');
        }
      })
      .catch(err => {
        alert('Invalid credentials');
        navigate('/login');
      });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/register', formData)
      .then(res => {
        setIsLoggedIn(() => {
          localStorage.setItem('email', JSON.stringify(formData.email));
          return {
            email: formData.email,
            isLogged : true,
          }
        });
        navigate('/');
      })
      .catch(err => {
        alert('User already exists');
      });
  };

  // Helper to split text into letters with delays
  const animateText = (text) => (
    text.split("").map((letter, index) => (
      <>
      <span
        key={index}
        className="fade-in-letter"
        style={{ animationDelay: `${index * 0.05}s` }}
      >
        {letter == " " ? "\u00A0" : letter}
      </span>
      </>
    ))
  );

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-6 sm:py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    {animateText("Welcome to Our Platform")}
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Join our community today and experience the power of collaboration.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg">Get Started</Button>
                  <Button size="lg" variant="outline">Learn More</Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Card className="w-full max-w-md">
                  <CardHeader>
                    <CardTitle>Welcome</CardTitle>
                    <CardDescription>Login or create an account to get started.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="register">SignUp</TabsTrigger>
                      </TabsList>
                      <TabsContent value="login">
                        <form onSubmit={handleLoginSubmit}>
                          <div className="grid gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="m@example.com"
                                required
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="password">Password</Label>
                              <Input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            <Button type="submit" className="w-full">
                              Login
                            </Button>
                          </div>
                        </form>
                      </TabsContent>
                      <TabsContent value="register">
                        <form onSubmit={handleRegisterSubmit}>
                          <div className="grid gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="username">Username</Label>
                              <Input
                                id="username"
                                name="username"
                                type="text"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="John Doe"
                                required
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="m@example.com"
                                required
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="password">Password</Label>
                              <Input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                              />
                            </div>
                            <Button type="submit" className="w-full">
                              Register
                            </Button>
                          </div>
                        </form>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                  <CardFooter className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm text-muted-foreground">
                      {activeTab === 'login' ? "Don't have an account?" : "Already have an account?"}
                    </div>
                    <Button variant="link" size="sm" onClick={() => setActiveTab(activeTab === 'login' ? 'register' : 'login')}>
                      {activeTab === 'login' ? 'Sign up' : 'Sign in'}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );

}

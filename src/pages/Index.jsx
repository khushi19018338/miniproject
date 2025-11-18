import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, MessageCircle, Heart, TrendingUp } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 text-primary mb-6">
            <Activity className="w-8 h-8" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Your Personal <span className="text-primary">Health Assistant</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Track your wellness journey with our AI-powered health assistant. Monitor diet, exercise, sleep, and get personalized advice.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button 
              size="lg" 
              onClick={() => navigate("/signup")}
              className="gap-2"
            >
              Get Started
              <TrendingUp className="w-4 h-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate("/chatbot")}
              className="gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Try Chatbot
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Everything You Need for Better Health
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/chatbot")}>
              <CardContent className="pt-6">
                <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit mb-4">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Health Assistant</h3>
                <p className="text-muted-foreground">
                  Get instant answers to your health questions with our intelligent chatbot powered by real-time WebSocket technology.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/tracker")}>
              <CardContent className="pt-6">
                <div className="p-3 rounded-lg bg-success/10 text-success w-fit mb-4">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Health Tracking</h3>
                <p className="text-muted-foreground">
                  Monitor your diet, exercise, and sleep patterns. Keep all your health data organized in one place.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/profile")}>
              <CardContent className="pt-6">
                <div className="p-3 rounded-lg bg-secondary/10 text-secondary w-fit mb-4">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Personal Profile</h3>
                <p className="text-muted-foreground">
                  Manage your health metrics, track your progress, and personalize your wellness journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary to-secondary py-16 px-4 text-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Your Wellness Journey Today
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Join thousands of users taking control of their health with HealthAssist
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => navigate("/signup")}
          >
            Create Free Account
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;

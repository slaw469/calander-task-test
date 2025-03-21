import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';

const quotes = [
  "The secret of getting ahead is getting started.",
  "Habits form the foundation of excellence.",
  "Small daily improvements are the key to staggering long-term results.",
  "Success is the sum of small efforts repeated day in and day out.",
  "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
  "The only way to do great work is to love what you do.",
  "You don't have to be great to start, but you have to start to be great.",
  "The difference between ordinary and extraordinary is practice.",
  "Your habits shape your identity, and your identity shapes your habits.",
  "Good habits are as addictive as bad ones – but much more rewarding."
];

const WelcomePage: React.FC = () => {
  const [quote, setQuote] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    // Generate a random quote when component mounts
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  const handleClick = () => {
    navigate({ to: '/habits' });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-lg space-y-8">
        <Card className="text-center p-8">
          <CardContent className="pt-6">
            <h1 className="text-3xl font-bold mb-4">Welcome User!</h1>
            <p className="text-lg italic text-muted-foreground">"{quote}"</p>
          </CardContent>
        </Card>
        
        <Button 
          className="w-full py-8 text-lg" 
          variant="outline"
          onClick={handleClick}
        >
          Click anywhere to view habits/tasks
        </Button>
      </div>
    </div>
  );
};

export default WelcomePage;
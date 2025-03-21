import React, { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Moon, 
  Sun, 
  Trash, 
  CloudDownload, 
  Download, 
  Upload,
  HelpCircle,
  Mail,
  Github,
  Info
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const SettingsPage: React.FC = () => {
  // User preferences state
  const [darkMode, setDarkMode] = useState(false);
  const [weekStartDay, setWeekStartDay] = useState('monday');
  const [syncEnabled, setSyncEnabled] = useState(true);
  const [streakGoal, setStreakGoal] = useState(7);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  
  // App information
  const appVersion = 'v1.2.0';
  const releaseDate = 'March 15, 2025';
  
  // FAQs
  const faqs = [
    {
      question: "How do I create a new habit?",
      answer: "To create a new habit, go to the Habits tab and use the 'Add' button at the top of the page. Enter the name of your habit and click 'Add' or press Enter."
    },
    {
      question: "How are streaks calculated?",
      answer: "Streaks are calculated based on consecutive days of completing a habit. If you miss a day, your streak will reset to zero unless you have enabled the 'Skip weekends' option in your habit settings."
    },
    {
      question: "Can I export my data?",
      answer: "Yes, you can export all your habit data by going to Settings > Data Management > Export Data. This will download a JSON file containing all your habits and tracking history."
    },
    {
      question: "How do I delete a habit?",
      answer: "To delete a habit, go to the Habits tab, find the habit you want to remove, and click the 'Delete' button next to it. Deleted habits are moved to the archive and can be restored later if needed."
    },
    {
      question: "Is my data backed up?",
      answer: "If you have enabled Cloud Sync in Settings > Account > Data Synchronization, your data is automatically backed up to the cloud. Otherwise, we recommend regularly exporting your data as a backup."
    }
  ];
  
  // Handler for saving settings
  const saveSettings = () => {
    toast.success("Settings saved", {
      description: "Your preferences have been updated",
    });
  };
  
  // Handler for account data export
  const exportData = () => {
    toast.info("Data export initiated", {
      description: "Your data will be prepared for download",
    });
  };
  
  // Handler for data import
  const importData = () => {
    // Implementation would be linked to file input
    toast.success("Import successful", {
      description: "Your data has been imported",
    });
  };
  
  // Handler for submitting feedback
  const submitFeedback = () => {
    if (feedback.trim()) {
      toast.success("Feedback submitted", {
        description: "Thank you for helping us improve!",
      });
      setFeedback('');
    } else {
      toast.error("Empty feedback", {
        description: "Please enter your feedback before submitting",
      });
    }
  };
  
  // Handler for account deletion
  const confirmDelete = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      toast.error("Account deleted", {
        description: "Your account has been successfully deleted",
      });
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Settings</CardTitle>
          <CardDescription>
            Customize your habit tracker experience
          </CardDescription>
        </CardHeader>
      </Card>
      
      <Tabs defaultValue="preferences">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="support">Support & About</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="data">Data Management</TabsTrigger>
        </TabsList>
        
        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Toggle between light and dark theme
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Sun size={18} />
                  <Switch 
                    id="dark-mode" 
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                  <Moon size={18} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Calendar Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="week-start">Week Starts On</Label>
                <Select 
                  value={weekStartDay} 
                  onValueChange={setWeekStartDay}
                >
                  <SelectTrigger id="week-start">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sunday">Sunday</SelectItem>
                    <SelectItem value="monday">Monday</SelectItem>
                    <SelectItem value="saturday">Saturday</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Streak Goal</Label>
                <div className="flex flex-col space-y-2">
                  <Slider 
                    min={1} 
                    max={30} 
                    step={1} 
                    value={[streakGoal]} 
                    onValueChange={(values) => setStreakGoal(values[0])}
                  />
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">1 day</span>
                    <span className="text-sm font-medium">{streakGoal} days</span>
                    <span className="text-sm text-muted-foreground">30 days</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Support & About Tab */}
        <TabsContent value="support" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Help & FAQs</CardTitle>
              <CardDescription>
                Find answers to common questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Visit Help Center
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Version Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border bg-card p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">Habit Tracker</h4>
                    <p className="text-sm text-muted-foreground">
                      Current Version: {appVersion}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Released: {releaseDate}
                    </p>
                  </div>
                  <Info className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>
              
              <h3 className="font-medium">What's New in {appVersion}</h3>
              <ul className="space-y-1">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Added heat map view for better visualizing habit completion patterns</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Improved data export options with CSV support</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Fixed calendar sync issues on mobile devices</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>New customizable streak goals feature</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Feedback</CardTitle>
              <CardDescription>
                Help us improve by sharing your thoughts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="feedback">Share Your Feedback</Label>
                <Textarea 
                  id="feedback" 
                  placeholder="Tell us what you think or report an issue..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={4}
                />
              </div>
              
              <div className="flex space-x-2">
                <Button onClick={submitFeedback} className="flex-1">
                  <Mail className="mr-2 h-4 w-4" />
                  Submit Feedback
                </Button>
                <Button variant="outline" className="flex-1">
                  <Github className="mr-2 h-4 w-4" />
                  Report Issue on GitHub
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Account Tab */}
        <TabsContent value="account" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Your username"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={saveSettings}>
                Update Profile
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                <Trash className="mr-2 h-4 w-4" />
                Delete Account
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Data Synchronization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sync">Cloud Sync</Label>
                  <p className="text-sm text-muted-foreground">
                    Sync your habits across all your devices
                  </p>
                </div>
                <div className="flex items-center">
                  <Switch 
                    id="sync" 
                    checked={syncEnabled}
                    onCheckedChange={setSyncEnabled}
                  />
                  <CloudDownload className="ml-2 h-4 w-4" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Data Management Tab */}
        <TabsContent value="data" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Export & Import</CardTitle>
              <CardDescription>
                Backup or restore your habit data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Export Data</Label>
                <p className="text-sm text-muted-foreground">
                  Download all your habit data and settings as a JSON file
                </p>
                <Button variant="outline" onClick={exportData}>
                  <Download className="mr-2 h-4 w-4" />
                  Export All Data
                </Button>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>Import Data</Label>
                <p className="text-sm text-muted-foreground">
                  Restore your habits from a previously exported file
                </p>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="file-import">Upload JSON File</Label>
                  <Input id="file-import" type="file" accept=".json" />
                </div>
                <Button variant="outline" onClick={importData}>
                  <Upload className="mr-2 h-4 w-4" />
                  Import Data
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Habit Archive</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                View and restore archived habits that have been removed from your active list
              </p>
              <Button variant="outline">
                View Archived Habits
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button onClick={saveSettings}>
          Save All Settings
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;

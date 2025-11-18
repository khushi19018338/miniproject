import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import HealthCard from "@/components/HealthCard";
import { addHealthEntry, getHealthEntries } from "@/api/health";
import { Plus } from "lucide-react";

const HealthTracker = () => {
  const [entries, setEntries] = useState([
    {
      id: "1",
      type: "diet",
      title: "Breakfast",
      description: "Oatmeal with fruits and nuts",
      value: "350 cal",
      date: new Date().toLocaleDateString()
    },
    {
      id: "2",
      type: "exercise",
      title: "Morning Run",
      description: "5km jog in the park",
      value: "30 min",
      date: new Date().toLocaleDateString()
    },
    {
      id: "3",
      type: "sleep",
      title: "Night Sleep",
      description: "Good quality sleep",
      value: "7.5 hrs",
      date: new Date().toLocaleDateString()
    }
  ]);

  const [activeTab, setActiveTab] = useState("diet");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    value: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const data = await getHealthEntries();
      // setEntries(data);
    } catch (error) {
      console.error("Failed to load entries");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEntry = {
      id: Date.now().toString(),
      type: activeTab,
      title: formData.title,
      description: formData.description,
      value: formData.value,
      date: new Date().toLocaleDateString()
    };

    try {
      await addHealthEntry(newEntry);
      setEntries([newEntry, ...entries]);
      setFormData({ title: "", description: "", value: "" });

      toast({
        title: "Entry added",
        description: `Your ${activeTab} entry has been saved.`,
      });
    } catch (error) {
      toast({
        title: "Failed to add entry",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredEntries = entries.filter(entry => entry.type === activeTab);

  return (
    <div className="min-h-[calc(100vh-4rem)] p-4 md:p-8 bg-gradient-to-br from-background to-accent/20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Health Tracker</h1>
          <p className="text-muted-foreground">Track your daily diet, exercise, and sleep</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add Entry Form */}
          <Card className="lg:col-span-1 shadow-lg">
            <CardHeader>
              <CardTitle>Add New Entry</CardTitle>
              <CardDescription>Record your health activity</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v)}>
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="diet">Diet</TabsTrigger>
                  <TabsTrigger value="exercise">Exercise</TabsTrigger>
                  <TabsTrigger value="sleep">Sleep</TabsTrigger>
                </TabsList>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder={`e.g., ${activeTab === 'diet' ? 'Lunch' : activeTab === 'exercise' ? 'Gym Session' : 'Afternoon Nap'}`}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Add details..."
                      required
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="value">
                      {activeTab === 'diet' ? 'Calories' : activeTab === 'exercise' ? 'Duration' : 'Hours'}
                    </Label>
                    <Input
                      id="value"
                      value={formData.value}
                      onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                      placeholder={`e.g., ${activeTab === 'diet' ? '500 cal' : activeTab === 'exercise' ? '45 min' : '8 hrs'}`}
                    />
                  </div>

                  <Button type="submit" className="w-full gap-2">
                    <Plus className="w-4 h-4" />
                    Add Entry
                  </Button>
                </form>
              </Tabs>
            </CardContent>
          </Card>

          {/* Entries List */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="capitalize">{activeTab} Entries</CardTitle>
                <CardDescription>Your recent {activeTab} records</CardDescription>
              </CardHeader>
              <CardContent>
                {filteredEntries.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No entries yet. Add your first {activeTab} entry!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredEntries.map((entry) => (
                      <HealthCard
                        key={entry.id}
                        type={entry.type}
                        title={entry.title}
                        description={entry.description}
                        value={entry.value}
                        date={entry.date}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthTracker;

"use client"

import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Clock, Bell, Mail, Globe, Palette, BellRing } from "lucide-react";

interface NotificationPreferences {
  email?: boolean;
  push?: boolean;
  reminders?: boolean;
}

interface MeditationReminders {
  enabled: boolean; // This is required
  time?: string;
  days?: string[];
}

interface UserPreferences {
  theme?: "light" | "dark";
  language?: string;
  notificationPreferences?: NotificationPreferences;
  meditationDuration?: number;
  meditationReminders?: MeditationReminders;
}

const defaultPreferences: UserPreferences = {
  theme: "light",
  language: "en",
  notificationPreferences: {
    email: false,
    push: false,
    reminders: false,
  },
  meditationDuration: 10,
  meditationReminders: {
    enabled: false, // Always provide a default value
    time: "09:00",
    days: ["monday", "wednesday", "friday"],
  },
};

const WEEKDAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export default function ProfileSettings() {
  const { getToken } = useAuth();
  const { toast } = useToast();
  const { theme: currentTheme, setTheme } = useTheme();
  const [preferences, setPreferences] =
    useState<UserPreferences>(defaultPreferences);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPreferences();
  }, []);

  useEffect(() => {
    if (currentTheme && currentTheme !== preferences.theme) {
      updatePreferences({
        ...preferences,
        theme: currentTheme as "light" | "dark",
      });
    }
  }, [currentTheme]);

  const fetchPreferences = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await fetch("http://localhost:4001/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch preferences");

      const data = await response.json();
      setPreferences({
        ...defaultPreferences,
        ...data.preferences,
      });
    } catch (error) {
      console.error("Error fetching preferences:", error);
      toast({
        title: "Error",
        description: "Failed to load preferences",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async (
    newPreferences: Partial<UserPreferences>
  ) => {
    try {
      const token = await getToken();
      const response = await fetch("http://localhost:4001/users/preferences", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPreferences),
      });

      if (!response.ok) throw new Error("Failed to update preferences");

      const data = await response.json();
      setPreferences({
        ...defaultPreferences,
        ...data.preferences,
      });

      toast({
        title: "Success",
        description: "Preferences updated successfully",
      });
    } catch (error) {
      console.error("Error updating preferences:", error);
      toast({
        title: "Error",
        description: "Failed to update preferences",
        variant: "destructive",
      });
    }
  };

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    updatePreferences({
      ...preferences,
      theme: newTheme,
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Theme & Language
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select
                value={currentTheme || "light"}
                onValueChange={(value: "light" | "dark") =>
                  handleThemeChange(value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Language
                </div>
              </Label>
              <Select
                value={preferences.language}
                onValueChange={(value: string) =>
                  updatePreferences({
                    ...preferences,
                    language: value,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="emailNotifications"
                className="flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                Email Notifications
              </Label>
              <Switch
                id="emailNotifications"
                checked={preferences.notificationPreferences?.email}
                onCheckedChange={(checked) =>
                  updatePreferences({
                    ...preferences,
                    notificationPreferences: {
                      ...preferences.notificationPreferences,
                      email: checked,
                    },
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label
                htmlFor="pushNotifications"
                className="flex items-center gap-2"
              >
                <BellRing className="h-4 w-4" />
                Push Notifications
              </Label>
              <Switch
                id="pushNotifications"
                checked={preferences.notificationPreferences?.push}
                onCheckedChange={(checked) =>
                  updatePreferences({
                    ...preferences,
                    notificationPreferences: {
                      ...preferences.notificationPreferences,
                      push: checked,
                    },
                  })
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Meditation Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="meditationDuration">
                Default Duration (minutes)
              </Label>
              <Select
                value={preferences.meditationDuration?.toString()}
                onValueChange={(value: string) =>
                  updatePreferences({
                    ...preferences,
                    meditationDuration: parseInt(value),
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 minutes</SelectItem>
                  <SelectItem value="10">10 minutes</SelectItem>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="20">20 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="meditationReminders">Daily Reminders</Label>
              <Switch
                id="meditationReminders"
                checked={preferences.meditationReminders?.enabled}
                onCheckedChange={(checked) =>
                  updatePreferences({
                    ...preferences,
                    meditationReminders: {
                      ...preferences.meditationReminders,
                      enabled: checked,
                    },
                  })
                }
              />
            </div>

            {preferences.meditationReminders?.enabled && (
              <div className="space-y-2">
                <Label htmlFor="reminderTime">Reminder Time</Label>
                <input
                  type="time"
                  id="reminderTime"
                  value={preferences.meditationReminders?.time || "09:00"}
                  onChange={(e) =>
                    updatePreferences({
                      ...preferences,
                      meditationReminders: {
                        enabled:
                          preferences.meditationReminders?.enabled || false,
                        time: e.target.value,
                        days: preferences.meditationReminders?.days || [],
                      },
                    })
                  }
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import ProfileSettings from '@/components/ProfileSettings';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
        <ProfileSettings />
      </div>
    </div>
  );
}
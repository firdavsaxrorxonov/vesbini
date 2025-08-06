import { useState } from "react";
import {
  User,
  ShoppingBag,
  Gift,
  MessageCircle,
  MapPin,
  Edit3,
  ChevronRight,
  Camera,
  Trophy,
  LogOut
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { EditProfileModal } from "@/components/EditProfileModal";
import { PhotoEditModal } from "@/components/PhotoEditModal";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const achievements = [
  { title: "Первая покупка", earned: true },
  { title: "Постоянный клиент", earned: true },
  { title: "VIP покупатель", earned: false }
];

export function Profile() {
  const { user: authUser, logout } = useAuth();
  const { t } = useLanguage();
  const [profilePhoto, setProfilePhoto] = useState("/placeholder.svg");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [userStats] = useState({
    joinDate: "O'ktabr 2024",
    totalOrders: 12,
    totalSpent: 2450000,
    currentBonus: 25000
  });

  if (!authUser) return null;

  const menuItems = [
    {
      icon: ShoppingBag,
      title: t.myOrders,
      subtitle: "Xaridlar tarixi",
      badge: "3",
      action: () => console.log("Orders")
    },
    {
      icon: Gift,
      title: t.myBonuses,
      subtitle: "25,000 UZS mavjud",
      badge: null,
      action: () => console.log("Bonuses")
    },
    {
      icon: MessageCircle,
      title: t.feedback,
      subtitle: "Administrator bilan bog'lanish",
      badge: null,
      action: () => console.log("Feedback")
    },
    {
      icon: MapPin,
      title: t.ourAddress,
      subtitle: "Xaritada ko'rsatish",
      badge: null,
      action: () => console.log("Address")
    },
    {
      icon: Edit3,
      title: t.editInfo,
      subtitle: "Ism, telefon, manzil",
      badge: null,
      action: () => setIsEditModalOpen(true)
    }
  ];

  return (
    <div className="bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
        <div className="p-6 pb-8">
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="h-20 w-20 border-2 border-primary">
                <AvatarImage src={profilePhoto} alt={authUser.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                  {authUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                onClick={() => setIsPhotoModalOpen(true)}
                className="absolute -bottom-1 -right-1 h-8 w-8 p-0 rounded-full bg-primary hover:bg-primary/90"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground">{authUser.name}</h1>
              <p className="text-muted-foreground">{authUser.phone}</p>
              <p className="text-sm text-muted-foreground">
                {authUser.region}, {authUser.country}
              </p>
              <p className="text-sm text-muted-foreground">
                Участник с {userStats.joinDate}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="p-4 space-y-5">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">{userStats.totalOrders}</div>
            <div className="text-xs text-muted-foreground">{t.orders}</div>
          </div>

          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <div className="text-xl font-bold text-primary mb-1">
              {Math.floor(userStats.totalSpent / 1000)}K
            </div>
            <div className="text-xs text-muted-foreground">{t.spent}</div>
          </div>

          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <div className="text-xl font-bold text-success mb-1">
              {Math.floor(userStats.currentBonus / 1000)}K
            </div>
            <div className="text-xs text-muted-foreground">{t.bonuses}</div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <h3 className="font-semibold">Достижения</h3>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex-shrink-0">
                <Badge 
                  variant={achievement.earned ? "default" : "secondary"}
                  className={achievement.earned ? "bg-primary" : ""}
                >
                  {achievement.title}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-3">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={item.action}
                className="w-full bg-card border border-border rounded-xl p-4 flex items-center gap-4 hover:bg-card/80 transition-all duration-200 hover:shadow-md"
              >
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="h-6 w-6 text-primary" />
                </div>

                <div className="flex-1 text-left min-w-0">
                  <div className="font-medium text-foreground">{item.title}</div>
                  <div className="text-sm text-muted-foreground truncate">{item.subtitle}</div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  {item.badge && (
                    <Badge variant="secondary" className="bg-primary text-primary-foreground text-xs">
                      {item.badge}
                    </Badge>
                  )}
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Logout Button */}
        <div className="pt-6">
          <button
            onClick={logout}
            className="w-full bg-destructive/10 text-destructive border border-destructive/20 rounded-xl p-4 flex items-center justify-center gap-3 hover:bg-destructive/20 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Akkauntdan chiqish</span>
          </button>
        </div>

        {/* App Version */}
        <div className="text-center py-4">
          <p className="text-xs text-muted-foreground">
            Vesbini v1.0.0
          </p>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
      />

      {/* Photo Edit Modal */}
      <PhotoEditModal
        open={isPhotoModalOpen}
        onOpenChange={setIsPhotoModalOpen}
        currentProfilePhoto={profilePhoto}
        onProfilePhotoChange={setProfilePhoto}
        userName={authUser.name}
      />
    </div>
  );
}

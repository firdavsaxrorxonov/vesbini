import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const countries = [
  'Uzbekistan',
  'Kazakhstan', 
  'Kyrgyzstan',
  'Tajikistan',
  'Russia'
];

const uzbekistanRegions = [
  'Ташкент',
  'Самарканд',
  'Бухара',
  'Андижан',
  'Наманган',
  'Фергана',
  'Навои',
  'Джизак',
  'Сырдарья',
  'Кашкадарья',
  'Сурхандарья',
  'Хорезм',
  'Каракалпакстан'
];

export function Login() {
  const [step, setStep] = useState<'register' | 'verify'>('register');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    country: '',
    region: ''
  });
  const [verificationCode, setVerificationCode] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { login, verifyUser } = useAuth();
  const { t } = useLanguage();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Введите ваше имя';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Введите номер телефона';
    } else if (!/^\+\d{12}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Неверный формат номера телефона';
    }
    
    if (!formData.country) {
      newErrors.country = 'Выберите страну';
    }
    
    if (!formData.region.trim()) {
      newErrors.region = 'Укажите регион';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validateForm()) {
      // Simulate SMS sending
      setStep('verify');
    }
  };

  const handleVerify = () => {
    if (verificationCode === '1234') { // Demo code
      login(formData);
      verifyUser();
    } else {
      setErrors({ code: 'Неверный код подтверждения' });
    }
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.startsWith('998')) {
      const formatted = cleaned.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '+$1 $2 $3 $4 $5');
      return formatted;
    }
    return '+' + cleaned;
  };

  if (step === 'verify') {
    return (
      <div className="h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md scale-in">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <div className="text-2xl">📱</div>
            </div>
            <CardTitle>Подтверждение</CardTitle>
            <CardDescription>
              Мы отправили SMS-код на номер {formData.phone}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Код подтверждения</Label>
              <Input
                id="code"
                type="text"
                placeholder="Введите 4-значный код"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={4}
                className="text-center text-lg tracking-widest"
              />
              {errors.code && (
                <p className="text-sm text-destructive">{errors.code}</p>
              )}
            </div>
            
            <Button 
              onClick={handleVerify}
              disabled={verificationCode.length !== 4}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Подтвердить
            </Button>
            
            <div className="text-center">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setStep('register')}
              >
                Изменить номер телефона
              </Button>
            </div>
            
            <div className="text-center text-xs text-muted-foreground">
              Демо код: 1234
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md scale-in">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <h1 className="text-3xl font-bold text-primary">Vesbini</h1>
          </div>
          <CardTitle>Добро пожаловать!</CardTitle>
          <CardDescription>
            Создайте аккаунт для совершения покупок
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Полное имя</Label>
            <Input
              id="name"
              type="text"
              placeholder="Введите ваше имя"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Номер телефона</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+998 90 123 45 67"
              value={formData.phone}
              onChange={(e) => setFormData({ 
                ...formData, 
                phone: formatPhoneNumber(e.target.value) 
              })}
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="country">Страна</Label>
            <Select value={formData.country} onValueChange={(value) => 
              setFormData({ ...formData, country: value, region: '' })
            }>
              <SelectTrigger>
                <SelectValue placeholder="Выберите страну" />
              </SelectTrigger>
              <SelectContent>
                {countries.map(country => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.country && (
              <p className="text-sm text-destructive">{errors.country}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="region">Регион</Label>
            {formData.country === 'Uzbekistan' ? (
              <Select value={formData.region} onValueChange={(value) => 
                setFormData({ ...formData, region: value })
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите регион" />
                </SelectTrigger>
                <SelectContent>
                  {uzbekistanRegions.map(region => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                id="region"
                type="text"
                placeholder="Введите ваш регион"
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
              />
            )}
            {errors.region && (
              <p className="text-sm text-destructive">{errors.region}</p>
            )}
          </div>
          
          <Button 
            onClick={handleRegister}
            className="w-full bg-primary hover:bg-primary/90"
          >
            Продолжить
          </Button>
          
          <div className="text-center text-xs text-muted-foreground">
            Продолжая, вы соглашаетесь с условиями использования
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

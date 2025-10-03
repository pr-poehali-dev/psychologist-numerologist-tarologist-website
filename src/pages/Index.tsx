import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import TarotReading from '@/components/TarotReading';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const Index = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const services = [
    {
      icon: 'Eye',
      title: 'Психологические консультации',
      description: 'Индивидуальный подход к решению личных проблем',
      price: 'от 3000 ₽',
      hasOnline: false
    },
    {
      icon: 'Hash',
      title: 'Нумерология',
      description: 'Анализ жизненного пути через числа',
      price: 'от 2500 ₽',
      hasOnline: false
    },
    {
      icon: 'Sparkles',
      title: 'Таро',
      description: 'Расклады на важные жизненные вопросы',
      price: 'от 2000 ₽',
      hasOnline: true
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Заявка отправлена!',
      description: 'Я свяжусь с вами в ближайшее время',
    });
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Юлия Толкач</h1>
          <div className="hidden md:flex gap-8">
            <a href="#home" className="text-gray-700 hover:text-primary transition-colors">Главная</a>
            <a href="#services" className="text-gray-700 hover:text-primary transition-colors">Услуги</a>
            <a href="#prices" className="text-gray-700 hover:text-primary transition-colors">Цены</a>
            <a href="#booking" className="text-gray-700 hover:text-primary transition-colors">Консультации</a>
            <a href="#contacts" className="text-gray-700 hover:text-primary transition-colors">Контакты</a>
          </div>
          <Button size="sm" className="md:hidden" variant="ghost">
            <Icon name="Menu" size={24} />
          </Button>
        </nav>
      </header>

      <section id="home" className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
                Психолог • Нумеролог • Таролог
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Помогу найти ответы на важные вопросы и обрести гармонию через древние практики и современную психологию
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>
                Записаться на консультацию
              </Button>
            </div>
            <div className="animate-scale-in">
              <img 
                src="/img/04ed2021-603c-4d8d-9499-fa4a0b39f9d4.jpg" 
                alt="Spiritual consultation" 
                className="rounded-lg shadow-2xl w-full object-cover aspect-square"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Услуги</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Индивидуальный подход к каждому клиенту с использованием проверенных методик
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-all animate-fade-in hover:shadow-lg" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name={service.icon} size={32} className="text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-2xl font-bold text-primary">{service.price}</p>
                  {service.hasOnline && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <Icon name="Sparkles" className="mr-2 h-4 w-4" />
                          Попробовать онлайн
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl">Онлайн расклад Таро</DialogTitle>
                        </DialogHeader>
                        <TarotReading />
                      </DialogContent>
                    </Dialog>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="prices" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">Цены</h2>
          <div className="space-y-6">
            <Card className="border-2">
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Психологическая консультация (60 мин)</h3>
                  <p className="text-gray-600">Личная встреча или онлайн</p>
                </div>
                <p className="text-3xl font-bold text-primary">3000 ₽</p>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Нумерологический анализ</h3>
                  <p className="text-gray-600">Полный разбор персональных чисел</p>
                </div>
                <p className="text-3xl font-bold text-primary">2500 ₽</p>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Расклад Таро</h3>
                  <p className="text-gray-600">Детальный ответ на ваш вопрос</p>
                </div>
                <p className="text-3xl font-bold text-primary">2000 ₽</p>
              </CardContent>
            </Card>
            <Card className="border-2 bg-primary/5">
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Комплексная консультация</h3>
                  <p className="text-gray-600">Психология + Нумерология + Таро (90 мин)</p>
                </div>
                <p className="text-3xl font-bold text-primary">5500 ₽</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="booking" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-4xl font-bold text-center mb-4">Запись на консультацию</h2>
          <p className="text-center text-gray-600 mb-12">
            Заполните форму, и я свяжусь с вами для уточнения деталей
          </p>
          <Card className="border-2">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Ваше имя</label>
                  <Input 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Введите ваше имя"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input 
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Телефон</label>
                  <Input 
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Интересующая услуга</label>
                  <Input 
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    placeholder="Психология / Нумерология / Таро"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Сообщение</label>
                  <Textarea 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Расскажите о вашем запросе..."
                    rows={4}
                  />
                </div>
                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                  Отправить заявку
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Контакты</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <a href="tel:+79991234567" className="flex items-center gap-3 text-lg hover:text-primary transition-colors">
              <Icon name="Phone" size={24} />
              <span>+7 (999) 123-45-67</span>
            </a>
            <a href="mailto:julia@example.com" className="flex items-center gap-3 text-lg hover:text-primary transition-colors">
              <Icon name="Mail" size={24} />
              <span>julia@example.com</span>
            </a>
            <a href="#" className="flex items-center gap-3 text-lg hover:text-primary transition-colors">
              <Icon name="Instagram" size={24} />
              <span>@julia.tolkach</span>
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-secondary text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold text-primary mb-4">Юлия Толкач</h3>
          <p className="text-gray-300 mb-6">Психолог • Нумеролог • Таролог</p>
          <p className="text-sm text-gray-400">© 2024 Все права защищены</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
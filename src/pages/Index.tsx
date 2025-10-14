import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const rooms = [
    {
      id: 1,
      name: 'Делюкс номер',
      price: '13 000',
      image: 'https://cdn.poehali.dev/projects/3c05e116-1d88-4cca-93c0-01c34caaf2e7/files/924c2126-bca9-4aec-b1d2-fa318bbff0c3.jpg',
      beds: 2,
      guests: 2,
      size: '32 м²'
    },
    {
      id: 2,
      name: 'Люкс с видом',
      price: '18 500',
      image: 'https://cdn.poehali.dev/projects/3c05e116-1d88-4cca-93c0-01c34caaf2e7/files/d575ab5f-0475-4a3d-9cc2-2c3fd7b8530b.jpg',
      beds: 1,
      guests: 2,
      size: '45 м²'
    },
    {
      id: 3,
      name: 'Президентский люкс',
      price: '28 000',
      image: 'https://cdn.poehali.dev/projects/3c05e116-1d88-4cca-93c0-01c34caaf2e7/files/b74ae35d-02e8-456c-ae55-659b3d865926.jpg',
      beds: 2,
      guests: 4,
      size: '68 м²'
    }
  ];

  const reviews = [
    {
      id: 1,
      name: 'Анна Петрова',
      rating: 5,
      text: 'Потрясающий отель! Современный дизайн, отличный сервис и невероятный вид из окна. Обязательно вернёмся!',
      date: '15 сентября 2024'
    },
    {
      id: 2,
      name: 'Дмитрий Соколов',
      rating: 5,
      text: 'Идеальное место для отдыха. Всё продумано до мелочей. Персонал очень внимательный и доброжелательный.',
      date: '8 сентября 2024'
    },
    {
      id: 3,
      name: 'Мария Новикова',
      rating: 5,
      text: 'Провели здесь медовый месяц. Романтичная атмосфера, комфортные номера, отличная кухня. Спасибо!',
      date: '1 сентября 2024'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              LUXURY HOTEL
            </h1>
            <div className="hidden md:flex gap-6">
              {['Главная', 'Бронирование', 'Галерея', 'Отзывы', 'О нас', 'Контакты'].map((item, idx) => {
                const id = ['home', 'booking', 'gallery', 'reviews', 'about', 'contacts'][idx];
                return (
                  <button
                    key={item}
                    onClick={() => scrollToSection(id)}
                    className={`font-medium transition-colors hover:text-primary ${
                      activeSection === id ? 'text-primary' : 'text-foreground/70'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
            <Button className="md:hidden" variant="outline" size="icon">
              <Icon name="Menu" size={20} />
            </Button>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-24 pb-16 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold leading-tight">
              Ваш идеальный
              <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                отдых начинается здесь
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Современный дизайн, премиальный сервис и незабываемые впечатления в самом сердце города
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button size="lg" className="text-lg" onClick={() => scrollToSection('booking')}>
                Забронировать номер
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg" onClick={() => scrollToSection('gallery')}>
                Посмотреть номера
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
            {[
              { icon: 'MapPin', title: 'Центр города', desc: 'В 5 минутах от главных достопримечательностей' },
              { icon: 'Wifi', title: 'Бесплатный Wi-Fi', desc: 'Высокоскоростной интернет во всех номерах' },
              { icon: 'Coffee', title: 'Завтрак включён', desc: 'Разнообразное меню из свежих продуктов' }
            ].map((feature, idx) => (
              <Card key={idx} className="border-2 hover:border-primary/50 transition-all hover:scale-105 animate-scale-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <CardContent className="pt-6 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto">
                    <Icon name={feature.icon} size={24} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Забронировать номер</h2>
              <p className="text-lg text-muted-foreground">Выберите даты заезда и выезда, а также подходящий номер</p>
            </div>

            <Card className="mb-8 border-2">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Дата заезда</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left">
                          <Icon name="Calendar" size={18} className="mr-2" />
                          {checkIn ? format(checkIn, 'dd MMMM yyyy', { locale: ru }) : 'Выберите дату'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} locale={ru} />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Дата выезда</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left">
                          <Icon name="Calendar" size={18} className="mr-2" />
                          {checkOut ? format(checkOut, 'dd MMMM yyyy', { locale: ru }) : 'Выберите дату'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} locale={ru} />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="flex items-end">
                    <Button className="w-full" size="lg">
                      <Icon name="Search" size={18} className="mr-2" />
                      Найти номера
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div id="gallery" className="grid md:grid-cols-3 gap-6">
              {rooms.map((room, idx) => (
                <Card key={room.id} className="overflow-hidden hover:shadow-xl transition-all hover:scale-105 animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="relative h-48 overflow-hidden">
                    <img src={room.image} alt={room.name} className="w-full h-full object-cover transition-transform hover:scale-110" />
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="font-semibold text-primary">{room.price} ₽</span>
                      <span className="text-xs text-muted-foreground">/ночь</span>
                    </div>
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <h3 className="font-bold text-xl">{room.name}</h3>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Icon name="Bed" size={16} />
                        <span>{room.beds} кровати</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Users" size={16} />
                        <span>{room.guests} гостей</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Maximize" size={16} />
                        <span>{room.size}</span>
                      </div>
                    </div>
                    <Button className="w-full">
                      Забронировать
                      <Icon name="ArrowRight" size={16} className="ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-16 bg-gradient-to-br from-secondary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Отзывы наших гостей</h2>
              <p className="text-lg text-muted-foreground">Мы ценим каждого гостя и стремимся сделать ваш отдых незабываемым</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {reviews.map((review, idx) => (
                <Card key={review.id} className="hover:shadow-lg transition-all animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Icon key={i} name="Star" size={18} className="text-accent fill-accent" />
                      ))}
                    </div>
                    <p className="text-muted-foreground italic">"{review.text}"</p>
                    <div className="pt-4 border-t">
                      <p className="font-semibold">{review.name}</p>
                      <p className="text-sm text-muted-foreground">{review.date}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold">О нашем отеле</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Luxury Hotel — это современное пространство для комфортного отдыха в центре города. Мы создали уникальную атмосферу, где сочетаются стильный дизайн, передовые технологии и искренняя забота о каждом госте.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Наша команда профессионалов работает для того, чтобы ваше пребывание у нас стало незабываемым. Мы предлагаем не просто номера, а полноценный опыт роскошного отдыха.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <div className="text-3xl font-bold text-primary">50+</div>
                    <div className="text-sm text-muted-foreground">Премиальных номеров</div>
                  </div>
                  <div className="text-center p-4 bg-secondary/5 rounded-lg">
                    <div className="text-3xl font-bold text-secondary">24/7</div>
                    <div className="text-sm text-muted-foreground">Консьерж-сервис</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://cdn.poehali.dev/projects/3c05e116-1d88-4cca-93c0-01c34caaf2e7/files/d575ab5f-0475-4a3d-9cc2-2c3fd7b8530b.jpg" 
                    alt="Hotel Interior" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full opacity-20 blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Контакты</h2>
              <p className="text-lg text-muted-foreground">Свяжитесь с нами любым удобным способом</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-all">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto">
                    <Icon name="Phone" size={24} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-lg">Телефон</h3>
                  <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                  <p className="text-sm text-muted-foreground">Ежедневно 24/7</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center mx-auto">
                    <Icon name="Mail" size={24} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-muted-foreground">info@luxuryhotel.ru</p>
                  <p className="text-sm text-muted-foreground">Ответим в течение часа</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center mx-auto">
                    <Icon name="MapPin" size={24} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-lg">Адрес</h3>
                  <p className="text-muted-foreground">г. Москва, ул. Тверская, 15</p>
                  <p className="text-sm text-muted-foreground">Метро Тверская</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                LUXURY HOTEL
              </h3>
              <p className="text-sm text-background/70 mt-1">Ваш идеальный отдых начинается здесь</p>
            </div>
            <div className="flex gap-6">
              {[
                { icon: 'Instagram', link: '#' },
                { icon: 'Facebook', link: '#' },
                { icon: 'Twitter', link: '#' }
              ].map((social) => (
                <a
                  key={social.icon}
                  href={social.link}
                  className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-all hover:scale-110"
                >
                  <Icon name={social.icon} size={20} className="text-background" />
                </a>
              ))}
            </div>
          </div>
          <div className="border-t border-background/10 mt-6 pt-6 text-center text-sm text-background/60">
            <p>&copy; 2024 Luxury Hotel. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface TarotCard {
  name: string;
  meaning: string;
  position: string;
  image: string;
}

const tarotDeck: Omit<TarotCard, 'position'>[] = [
  { name: 'Шут', meaning: 'Новые начинания, спонтанность, свобода', image: '/img/b5aae9af-1ddd-4f97-9203-de42b73995e7.jpg' },
  { name: 'Маг', meaning: 'Сила воли, мастерство, проявление намерений', image: '/img/aea85904-f81c-43f4-bdf3-8d6aec70b48d.jpg' },
  { name: 'Верховная Жрица', meaning: 'Интуиция, тайные знания, внутренняя мудрость', image: '/img/c9b22b56-b81c-4f5f-80e5-bfd4ef255bc3.jpg' },
  { name: 'Императрица', meaning: 'Изобилие, плодородие, забота', image: '/img/b5aae9af-1ddd-4f97-9203-de42b73995e7.jpg' },
  { name: 'Император', meaning: 'Власть, стабильность, контроль', image: '/img/aea85904-f81c-43f4-bdf3-8d6aec70b48d.jpg' },
  { name: 'Иерофант', meaning: 'Традиции, духовность, наставничество', image: '/img/c9b22b56-b81c-4f5f-80e5-bfd4ef255bc3.jpg' },
  { name: 'Влюблённые', meaning: 'Выбор, любовь, гармония отношений', image: '/img/b5aae9af-1ddd-4f97-9203-de42b73995e7.jpg' },
  { name: 'Колесница', meaning: 'Победа, целеустремлённость, контроль', image: '/img/aea85904-f81c-43f4-bdf3-8d6aec70b48d.jpg' },
  { name: 'Сила', meaning: 'Внутренняя сила, храбрость, терпение', image: '/img/c9b22b56-b81c-4f5f-80e5-bfd4ef255bc3.jpg' },
  { name: 'Отшельник', meaning: 'Самопознание, одиночество, внутренний поиск', image: '/img/b5aae9af-1ddd-4f97-9203-de42b73995e7.jpg' },
  { name: 'Колесо Фортуны', meaning: 'Судьба, перемены, циклы жизни', image: '/img/aea85904-f81c-43f4-bdf3-8d6aec70b48d.jpg' },
  { name: 'Справедливость', meaning: 'Баланс, истина, справедливость', image: '/img/c9b22b56-b81c-4f5f-80e5-bfd4ef255bc3.jpg' },
  { name: 'Повешенный', meaning: 'Жертва, новая перспектiva, освобождение', image: '/img/b5aae9af-1ddd-4f97-9203-de42b73995e7.jpg' },
  { name: 'Смерть', meaning: 'Трансформация, окончание, новое начало', image: '/img/aea85904-f81c-43f4-bdf3-8d6aec70b48d.jpg' },
  { name: 'Умеренность', meaning: 'Баланс, терпение, умеренность', image: '/img/c9b22b56-b81c-4f5f-80e5-bfd4ef255bc3.jpg' },
  { name: 'Дьявол', meaning: 'Искушение, зависимость, материализм', image: '/img/b5aae9af-1ddd-4f97-9203-de42b73995e7.jpg' },
  { name: 'Башня', meaning: 'Внезапные перемены, разрушение иллюзий', image: '/img/aea85904-f81c-43f4-bdf3-8d6aec70b48d.jpg' },
  { name: 'Звезда', meaning: 'Надежда, вдохновение, обновление', image: '/img/c9b22b56-b81c-4f5f-80e5-bfd4ef255bc3.jpg' },
  { name: 'Луна', meaning: 'Иллюзии, интуиция, подсознание', image: '/img/b5aae9af-1ddd-4f97-9203-de42b73995e7.jpg' },
  { name: 'Солнце', meaning: 'Радость, успех, позитив', image: '/img/aea85904-f81c-43f4-bdf3-8d6aec70b48d.jpg' },
  { name: 'Суд', meaning: 'Пробуждение, второй шанс, освобождение', image: '/img/c9b22b56-b81c-4f5f-80e5-bfd4ef255bc3.jpg' },
  { name: 'Мир', meaning: 'Завершение, целостность, достижение', image: '/img/b5aae9af-1ddd-4f97-9203-de42b73995e7.jpg' }
];

const TarotReading = () => {
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  const shuffleAndDraw = () => {
    setIsDrawing(true);
    setIsRevealed(false);
    
    const shuffled = [...tarotDeck].sort(() => Math.random() - 0.5);
    const drawn = [
      { ...shuffled[0], position: 'Прошлое' },
      { ...shuffled[1], position: 'Настоящее' },
      { ...shuffled[2], position: 'Будущее' }
    ];
    
    setTimeout(() => {
      setCards(drawn);
      setIsDrawing(false);
    }, 800);
  };

  const revealCards = () => {
    setIsRevealed(true);
  };

  return (
    <div className="w-full">
      {cards.length === 0 ? (
        <div className="text-center py-12">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center shadow-lg">
              <Icon name="Sparkles" size={40} className="text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-4">Онлайн расклад Таро</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
              Сконцентрируйтесь на своём вопросе и нажмите кнопку. Карты откроют путь к ответу.
            </p>
          </div>
          <Button 
            size="lg" 
            onClick={shuffleAndDraw}
            disabled={isDrawing}
            className="bg-primary hover:bg-primary/90 text-lg px-8 py-6"
          >
            {isDrawing ? (
              <>
                <Icon name="Loader2" className="mr-2 h-6 w-6 animate-spin" />
                Тасую карты...
              </>
            ) : (
              <>
                <Icon name="Sparkles" className="mr-2 h-6 w-6" />
                Начать гадание
              </>
            )}
          </Button>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <div 
                key={index} 
                className="animate-scale-in perspective-1000"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div 
                  className={`relative cursor-pointer transition-all duration-700 transform-gpu ${
                    isRevealed ? '' : 'hover:scale-105'
                  }`}
                  onClick={!isRevealed ? revealCards : undefined}
                  style={{ 
                    transformStyle: 'preserve-3d',
                    transform: isRevealed ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  <div 
                    className="absolute inset-0 w-full h-full"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <Card className="h-80 border-none shadow-2xl overflow-hidden">
                      <CardContent className="p-0 h-80 relative">
                        <img 
                          src="/img/17e753ec-3b66-4edc-bbf3-8373b733ed77.jpg" 
                          alt="Рубашка карты Таро" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30">
                          <p className="text-white text-lg font-bold tracking-wider uppercase mb-2">{card.position}</p>
                          <p className="text-white/80 text-sm">Нажмите, чтобы открыть</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div 
                    className="absolute inset-0 w-full h-full"
                    style={{ 
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <Card className="h-80 border-none shadow-2xl overflow-hidden">
                      <CardContent className="p-0 h-80 relative overflow-hidden">
                        <img 
                          src={card.image} 
                          alt={card.name} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6">
                          <div className="text-xs text-primary font-medium uppercase tracking-wider mb-2">{card.position}</div>
                          <h4 className="text-2xl font-bold text-white mb-2">{card.name}</h4>
                          <p className="text-white/90 text-sm leading-relaxed">{card.meaning}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!isRevealed && (
            <div className="text-center animate-fade-in">
              <Button 
                size="lg" 
                onClick={revealCards}
                className="bg-primary hover:bg-primary/90 text-lg px-8 py-6"
              >
                <Icon name="Eye" className="mr-2 h-6 w-6" />
                Открыть карты
              </Button>
            </div>
          )}

          {isRevealed && (
            <div className="text-center animate-fade-in space-y-6">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-2xl max-w-2xl mx-auto border border-primary/20">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <Icon name="Heart" size={32} className="text-white" />
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Помните: карты показывают возможности, но решения принимаете вы. 
                  Для более глубокого понимания расклада запишитесь на личную консультацию.
                </p>
              </div>
              <Button 
                variant="outline"
                size="lg"
                onClick={() => {
                  setCards([]);
                  setIsRevealed(false);
                }}
                className="border-2"
              >
                <Icon name="RotateCcw" className="mr-2 h-5 w-5" />
                Новый расклад
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TarotReading;
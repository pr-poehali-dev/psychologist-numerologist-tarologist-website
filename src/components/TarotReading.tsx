import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface TarotCard {
  name: string;
  meaning: string;
  position: string;
}

const tarotDeck: Omit<TarotCard, 'position'>[] = [
  { name: 'Шут', meaning: 'Новые начинания, спонтанность, свобода' },
  { name: 'Маг', meaning: 'Сила воли, мастерство, проявление намерений' },
  { name: 'Верховная Жрица', meaning: 'Интуиция, тайные знания, внутренняя мудрость' },
  { name: 'Императрица', meaning: 'Изобилие, плодородие, забота' },
  { name: 'Император', meaning: 'Власть, стабильность, контроль' },
  { name: 'Иерофант', meaning: 'Традиции, духовность, наставничество' },
  { name: 'Влюблённые', meaning: 'Выбор, любовь, гармония отношений' },
  { name: 'Колесница', meaning: 'Победа, целеустремлённость, контроль' },
  { name: 'Сила', meaning: 'Внутренняя сила, храбрость, терпение' },
  { name: 'Отшельник', meaning: 'Самопознание, одиночество, внутренний поиск' },
  { name: 'Колесо Фортуны', meaning: 'Судьба, перемены, циклы жизни' },
  { name: 'Справедливость', meaning: 'Баланс, истина, справедливость' },
  { name: 'Повешенный', meaning: 'Жертва, новая перспектива, освобождение' },
  { name: 'Смерть', meaning: 'Трансформация, окончание, новое начало' },
  { name: 'Умеренность', meaning: 'Баланс, терпение, умеренность' },
  { name: 'Дьявол', meaning: 'Искушение, зависимость, материализм' },
  { name: 'Башня', meaning: 'Внезапные перемены, разрушение иллюзий' },
  { name: 'Звезда', meaning: 'Надежда, вдохновение, обновление' },
  { name: 'Луна', meaning: 'Иллюзии, интуиция, подсознание' },
  { name: 'Солнце', meaning: 'Радость, успех, позитив' },
  { name: 'Суд', meaning: 'Пробуждение, второй шанс, освобождение' },
  { name: 'Мир', meaning: 'Завершение, целостность, достижение' }
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
            <Icon name="Sparkles" size={64} className="mx-auto text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-4">Онлайн расклад Таро</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Сконцентрируйтесь на своём вопросе и нажмите кнопку. Карты откроют путь к ответу.
            </p>
          </div>
          <Button 
            size="lg" 
            onClick={shuffleAndDraw}
            disabled={isDrawing}
            className="bg-primary hover:bg-primary/90"
          >
            {isDrawing ? (
              <>
                <Icon name="Loader2" className="mr-2 h-5 w-5 animate-spin" />
                Тасую карты...
              </>
            ) : (
              <>
                <Icon name="Sparkles" className="mr-2 h-5 w-5" />
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
                className="animate-scale-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <Card 
                  className={`relative cursor-pointer transition-all duration-500 transform ${
                    isRevealed ? '' : 'hover:scale-105'
                  }`}
                  onClick={!isRevealed ? revealCards : undefined}
                  style={{ 
                    transformStyle: 'preserve-3d',
                    transform: isRevealed ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  <div 
                    className="absolute inset-0 backface-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <CardContent className="p-8 h-64 flex flex-col items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 rounded-lg">
                      <Icon name="Star" size={48} className="text-primary mb-4" />
                      <p className="text-sm text-gray-600 font-medium">{card.position}</p>
                      <p className="text-xs text-gray-500 mt-2">Нажмите, чтобы открыть</p>
                    </CardContent>
                  </div>
                  
                  <div 
                    className="absolute inset-0 backface-hidden"
                    style={{ 
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <CardContent className="p-6 h-64 flex flex-col justify-between bg-gradient-to-br from-primary/10 to-white border-2 border-primary rounded-lg">
                      <div>
                        <div className="text-xs text-gray-500 mb-2">{card.position}</div>
                        <h4 className="text-xl font-bold text-primary mb-3">{card.name}</h4>
                        <p className="text-sm text-gray-700">{card.meaning}</p>
                      </div>
                      <Icon name="Sparkles" size={24} className="text-primary/30 self-end" />
                    </CardContent>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {!isRevealed && (
            <div className="text-center animate-fade-in">
              <Button 
                size="lg" 
                onClick={revealCards}
                className="bg-primary hover:bg-primary/90"
              >
                <Icon name="Eye" className="mr-2 h-5 w-5" />
                Открыть карты
              </Button>
            </div>
          )}

          {isRevealed && (
            <div className="text-center animate-fade-in space-y-4">
              <div className="bg-muted/30 p-6 rounded-lg max-w-2xl mx-auto">
                <Icon name="Heart" size={32} className="mx-auto text-primary mb-4" />
                <p className="text-gray-700 mb-4">
                  Помните: карты показывают возможности, но решения принимаете вы. 
                  Для более глубокого понимания расклада запишитесь на личную консультацию.
                </p>
              </div>
              <Button 
                variant="outline"
                onClick={() => {
                  setCards([]);
                  setIsRevealed(false);
                }}
              >
                <Icon name="RotateCcw" className="mr-2 h-4 w-4" />
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

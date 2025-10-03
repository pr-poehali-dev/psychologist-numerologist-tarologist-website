import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface TarotCard {
  name: string;
  meaning: string;
  position: string;
  icon: string;
  gradient: string;
}

const tarotDeck: Omit<TarotCard, 'position'>[] = [
  { name: 'Шут', meaning: 'Новые начинания, спонтанность, свобода', icon: 'Smile', gradient: 'from-yellow-400 to-orange-400' },
  { name: 'Маг', meaning: 'Сила воли, мастерство, проявление намерений', icon: 'Wand2', gradient: 'from-purple-400 to-pink-400' },
  { name: 'Верховная Жрица', meaning: 'Интуиция, тайные знания, внутренняя мудрость', icon: 'Moon', gradient: 'from-blue-400 to-indigo-400' },
  { name: 'Императрица', meaning: 'Изобилие, плодородие, забота', icon: 'Crown', gradient: 'from-green-400 to-emerald-400' },
  { name: 'Император', meaning: 'Власть, стабильность, контроль', icon: 'Shield', gradient: 'from-red-400 to-rose-400' },
  { name: 'Иерофант', meaning: 'Традиции, духовность, наставничество', icon: 'BookOpen', gradient: 'from-amber-400 to-yellow-400' },
  { name: 'Влюблённые', meaning: 'Выбор, любовь, гармония отношений', icon: 'Heart', gradient: 'from-pink-400 to-rose-400' },
  { name: 'Колесница', meaning: 'Победа, целеустремлённость, контроль', icon: 'Zap', gradient: 'from-cyan-400 to-blue-400' },
  { name: 'Сила', meaning: 'Внутренняя сила, храбрость, терпение', icon: 'Flame', gradient: 'from-orange-400 to-red-400' },
  { name: 'Отшельник', meaning: 'Самопознание, одиночество, внутренний поиск', icon: 'Lamp', gradient: 'from-gray-400 to-slate-400' },
  { name: 'Колесо Фортуны', meaning: 'Судьба, перемены, циклы жизни', icon: 'CircleDot', gradient: 'from-violet-400 to-purple-400' },
  { name: 'Справедливость', meaning: 'Баланс, истина, справедливость', icon: 'Scale', gradient: 'from-teal-400 to-cyan-400' },
  { name: 'Повешенный', meaning: 'Жертва, новая перспектива, освобождение', icon: 'UserX', gradient: 'from-indigo-400 to-blue-400' },
  { name: 'Смерть', meaning: 'Трансформация, окончание, новое начало', icon: 'Skull', gradient: 'from-gray-600 to-gray-800' },
  { name: 'Умеренность', meaning: 'Баланс, терпение, умеренность', icon: 'Droplets', gradient: 'from-sky-400 to-blue-400' },
  { name: 'Дьявол', meaning: 'Искушение, зависимость, материализм', icon: 'Flame', gradient: 'from-red-600 to-black' },
  { name: 'Башня', meaning: 'Внезапные перемены, разрушение иллюзий', icon: 'Castle', gradient: 'from-orange-600 to-red-600' },
  { name: 'Звезда', meaning: 'Надежда, вдохновение, обновление', icon: 'Star', gradient: 'from-yellow-300 to-amber-300' },
  { name: 'Луна', meaning: 'Иллюзии, интуиция, подсознание', icon: 'Moon', gradient: 'from-indigo-500 to-purple-500' },
  { name: 'Солнце', meaning: 'Радость, успех, позитив', icon: 'Sun', gradient: 'from-yellow-400 to-orange-500' },
  { name: 'Суд', meaning: 'Пробуждение, второй шанс, освобождение', icon: 'Bell', gradient: 'from-blue-400 to-indigo-500' },
  { name: 'Мир', meaning: 'Завершение, целостность, достижение', icon: 'Globe', gradient: 'from-green-400 to-teal-500' }
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
                      <CardContent className="p-0 h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black relative">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
                        <div className="relative z-10 flex flex-col items-center">
                          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-4 shadow-lg">
                            <Icon name="Star" size={40} className="text-white" />
                          </div>
                          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mb-4"></div>
                          <p className="text-primary text-lg font-bold tracking-wider uppercase">{card.position}</p>
                          <p className="text-gray-400 text-sm mt-3">Нажмите, чтобы открыть</p>
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
                      <CardContent className={`p-0 h-full flex flex-col justify-between bg-gradient-to-br ${card.gradient} relative`}>
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.5),rgba(255,255,255,0))]"></div>
                        <div className="relative z-10 p-6 flex-1 flex flex-col">
                          <div className="text-xs text-white/80 font-medium uppercase tracking-wider mb-3">{card.position}</div>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                              <Icon name={card.icon} size={28} className="text-white" />
                            </div>
                            <h4 className="text-2xl font-bold text-white flex-1">{card.name}</h4>
                          </div>
                          <div className="flex-1 flex items-center">
                            <p className="text-white/90 text-base leading-relaxed">{card.meaning}</p>
                          </div>
                        </div>
                        <div className="relative z-10 p-6 flex justify-between items-center border-t border-white/20">
                          <Icon name="Sparkles" size={20} className="text-white/60" />
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
                            ))}
                          </div>
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

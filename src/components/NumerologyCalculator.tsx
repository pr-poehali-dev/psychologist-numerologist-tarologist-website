import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface NumerologyResult {
  lifePathNumber: number;
  destinyNumber: number;
  personalityNumber: number;
  lifePathMeaning: string;
  destinyMeaning: string;
  personalityMeaning: string;
}

const numberMeanings: Record<number, { life: string; destiny: string; personality: string }> = {
  1: {
    life: 'Лидер и первопроходец. Вы рождены, чтобы вести за собой других, создавать новое и быть независимым.',
    destiny: 'Ваша судьба — быть инициатором перемен, развивать силу воли и уверенность в себе.',
    personality: 'Вы воспринимаетесь как сильная, независимая и харизматичная личность.'
  },
  2: {
    life: 'Миротворец и дипломат. Ваш путь — создавать гармонию, сотрудничать и помогать другим.',
    destiny: 'Призвание — быть посредником, развивать интуицию и чувствительность.',
    personality: 'Окружающие видят в вас чуткого, внимательного и дружелюбного человека.'
  },
  3: {
    life: 'Творец и коммуникатор. Вы созданы для самовыражения, творчества и вдохновения других.',
    destiny: 'Ваша миссия — приносить радость, развивать таланты и делиться позитивом.',
    personality: 'Вас воспринимают как яркую, артистичную и общительную натуру.'
  },
  4: {
    life: 'Строитель и организатор. Ваш путь — создавать стабильность, порядок и надёжные основы.',
    destiny: 'Призвание — быть практичным, трудолюбивым и создавать материальную безопасность.',
    personality: 'Люди видят в вас надёжного, ответственного и целеустремлённого человека.'
  },
  5: {
    life: 'Искатель приключений и свободы. Вы рождены для перемен, путешествий и новых впечатлений.',
    destiny: 'Ваша судьба — познавать мир, быть гибким и адаптироваться к переменам.',
    personality: 'Вас воспринимают как динамичного, свободолюбивого и любознательного.'
  },
  6: {
    life: 'Целитель и воспитатель. Ваш путь — заботиться о других, создавать уют и гармонию.',
    destiny: 'Миссия — нести ответственность за близких, служить и помогать людям.',
    personality: 'Окружающие видят в вас заботливого, любящего и ответственного человека.'
  },
  7: {
    life: 'Искатель истины и мудрец. Вы созданы для духовного роста, анализа и познания тайн.',
    destiny: 'Призвание — развивать интеллект, интуицию и искать глубинный смысл.',
    personality: 'Вас воспринимают как мудрого, загадочного и глубокомысленного человека.'
  },
  8: {
    life: 'Магнат и управленец. Ваш путь — достигать материального успеха и власти.',
    destiny: 'Ваша судьба — управлять ресурсами, быть амбициозным и влиятельным.',
    personality: 'Люди видят в вас сильного, успешного и авторитетного лидера.'
  },
  9: {
    life: 'Гуманист и учитель. Вы рождены служить человечеству и нести свет в мир.',
    destiny: 'Миссия — быть великодушным, помогать другим и завершать циклы.',
    personality: 'Вас воспринимают как мудрого, сострадательного и идеалистичного человека.'
  },
  11: {
    life: 'Духовный учитель и вдохновитель. Вы — проводник высших идей и света.',
    destiny: 'Призвание — вдохновлять других, развивать интуицию и духовность.',
    personality: 'Окружающие видят в вас харизматичного визионера и мистика.'
  },
  22: {
    life: 'Мастер-строитель. Вы способны воплощать великие мечты в реальность.',
    destiny: 'Ваша судьба — создавать масштабные проекты и менять мир к лучшему.',
    personality: 'Вас воспринимают как могущественного созидателя с огромным потенциалом.'
  }
};

const NumerologyCalculator = () => {
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState<NumerologyResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const reduceToSingleDigit = (num: number): number => {
    if (num === 11 || num === 22 || num === 33) return num;
    while (num > 9) {
      num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return num;
  };

  const calculateLifePath = (date: string): number => {
    const digits = date.replace(/-/g, '').split('').map(Number);
    const sum = digits.reduce((acc, digit) => acc + digit, 0);
    return reduceToSingleDigit(sum);
  };

  const calculateDestiny = (date: string): number => {
    const [year, month, day] = date.split('-').map(Number);
    const sum = year + month + day;
    return reduceToSingleDigit(sum);
  };

  const calculatePersonality = (date: string): number => {
    const [, , day] = date.split('-').map(Number);
    return reduceToSingleDigit(day);
  };

  const handleCalculate = () => {
    if (!birthDate) return;
    
    setIsCalculating(true);
    
    setTimeout(() => {
      const lifePathNumber = calculateLifePath(birthDate);
      const destinyNumber = calculateDestiny(birthDate);
      const personalityNumber = calculatePersonality(birthDate);
      
      const meanings = numberMeanings[lifePathNumber] || numberMeanings[9];
      const destinyMeanings = numberMeanings[destinyNumber] || numberMeanings[9];
      const personalityMeanings = numberMeanings[personalityNumber] || numberMeanings[9];
      
      setResult({
        lifePathNumber,
        destinyNumber,
        personalityNumber,
        lifePathMeaning: meanings.life,
        destinyMeaning: destinyMeanings.destiny,
        personalityMeaning: personalityMeanings.personality
      });
      setIsCalculating(false);
    }, 1000);
  };

  const numberColors = [
    'from-red-400 to-pink-400',
    'from-orange-400 to-amber-400',
    'from-yellow-400 to-lime-400',
    'from-green-400 to-emerald-400',
    'from-teal-400 to-cyan-400',
    'from-blue-400 to-indigo-400',
    'from-purple-400 to-violet-400',
    'from-pink-400 to-rose-400',
    'from-amber-400 to-orange-400'
  ];

  const getNumberColor = (num: number) => {
    return numberColors[(num - 1) % numberColors.length];
  };

  return (
    <div className="w-full">
      {!result ? (
        <div className="text-center py-12">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center shadow-lg">
              <Icon name="Hash" size={40} className="text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-4">Нумерологический анализ</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
              Введите дату рождения, и числа раскроют ваш жизненный путь
            </p>
          </div>
          
          <div className="max-w-md mx-auto space-y-6">
            <div>
              <label className="block text-left text-sm font-medium mb-2">Дата рождения</label>
              <Input 
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="text-lg"
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <Button 
              size="lg" 
              onClick={handleCalculate}
              disabled={!birthDate || isCalculating}
              className="w-full bg-primary hover:bg-primary/90 text-lg px-8 py-6"
            >
              {isCalculating ? (
                <>
                  <Icon name="Loader2" className="mr-2 h-6 w-6 animate-spin" />
                  Вычисляю числа...
                </>
              ) : (
                <>
                  <Icon name="Calculator" className="mr-2 h-6 w-6" />
                  Рассчитать
                </>
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-fade-in">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Ваш нумерологический профиль</h3>
            <p className="text-gray-600">Откройте тайны чисел вашей судьбы</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 border-primary/20 overflow-hidden">
              <CardContent className="p-0">
                <div className={`bg-gradient-to-br ${getNumberColor(result.lifePathNumber)} p-6 text-white`}>
                  <div className="text-center mb-4">
                    <Icon name="Route" size={32} className="mx-auto mb-2" />
                    <p className="text-sm uppercase tracking-wider opacity-90">Число жизненного пути</p>
                  </div>
                  <div className="text-6xl font-bold text-center">{result.lifePathNumber}</div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-700 leading-relaxed">{result.lifePathMeaning}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20 overflow-hidden">
              <CardContent className="p-0">
                <div className={`bg-gradient-to-br ${getNumberColor(result.destinyNumber)} p-6 text-white`}>
                  <div className="text-center mb-4">
                    <Icon name="Star" size={32} className="mx-auto mb-2" />
                    <p className="text-sm uppercase tracking-wider opacity-90">Число судьбы</p>
                  </div>
                  <div className="text-6xl font-bold text-center">{result.destinyNumber}</div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-700 leading-relaxed">{result.destinyMeaning}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20 overflow-hidden">
              <CardContent className="p-0">
                <div className={`bg-gradient-to-br ${getNumberColor(result.personalityNumber)} p-6 text-white`}>
                  <div className="text-center mb-4">
                    <Icon name="User" size={32} className="mx-auto mb-2" />
                    <p className="text-sm uppercase tracking-wider opacity-90">Число личности</p>
                  </div>
                  <div className="text-6xl font-bold text-center">{result.personalityNumber}</div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-700 leading-relaxed">{result.personalityMeaning}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center space-y-4">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-2xl max-w-2xl mx-auto border border-primary/20">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <Icon name="Lightbulb" size={32} className="text-white" />
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                Это базовый анализ ваших чисел. Для полного нумерологического разбора 
                с учётом имени, совместимости и прогноза запишитесь на личную консультацию.
              </p>
            </div>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => {
                setResult(null);
                setBirthDate('');
              }}
              className="border-2"
            >
              <Icon name="RotateCcw" className="mr-2 h-5 w-5" />
              Новый расчёт
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NumerologyCalculator;

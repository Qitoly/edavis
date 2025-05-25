import type { Metadata } from "next"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "План капитолия | E-Davis",
  description: "Схема расположения кабинетов и помещений в капитолии штата Davis",
}

export default function CapitolPlanPage() {
  const floorPlans = [
    {
      id: 1,
      title: "Первый этаж",
      image: "/goverment/map/floor-1.png",
      rooms: [
        "а) Зал 00 - Стойка регистрации",
        "б) Кабинет 01 - Кабинет Коллегии Адвокатов", 
        "в) Кабинет 02 - Кабинет Судебной власти",
        "г) Кабинет 03 - Кабинет Верховного судьи",
        "д) Кабинет 04 - Зал судебных заседаний",
        "е) Кабинет 05 - Кабинет лицензирования",
        "ё) Кабинет 06 - Кабинет лицензирования",
        "ж) Кабинет 07 - Кабинет для собеседований",
        "з) Кабинет 08 - Кабинет для собеседований",
        "и) Кабинет 09 - Конгресс-холл",
        "й) Кабинет 10 - Кабинет Государственного Казначейства",
        "к) Кабинет 11 - Кабинет Спикера Сената",
        "л) Кабинет 12 - Кабинет Офиса Генерального прокурора",
        "м) Кабинет 13 - Кабинет Аппарата Правительства",
      ],
    },
    {
      id: 2,
      title: "Второй этаж",
      image: "/goverment/map/floor-2.png",
      rooms: [
        "а) Кабинет 01 - Кабинет Главы Коллегии Адвокатов",
        "б) Кабинет 02 - Кабинет USSS",
        "в) Кабинет 03 - Раздевалка и склад",
        "г) Кабинет 04 - Кабинет Руководства USSS",
        "д) Кабинет 05 - Конференц-зал",
        "е) Кабинет 06 - Зона отдыха",
        "ё) Кабинет 07 - Комната свободного назначения",
        "ж) Кабинет 08 - Комната свободного назначения",
        "з) Кабинет 09 - Кабинет Главы Аппарата Правительства",
        "и) Комнаты WC - Уборные",
      ],
    },
    {
      id: 3,
      title: "Третий этаж",
      image: "/goverment/map/floor-3.png",
      rooms: [
        "а) Кабинет 01 - Кабинет Вице-губернатора",
        "б) Кабинет 02 - Кабинет Государственного Казначея",
        "в) Кабинет 03 - Кабинет Главы Администрации Губернатора",
        "г) Кабинет 04 - Кабинет Губернатора",
        "д) Кабинет 05 - Кабинет Главы Департамента Нац. Безопасности",
        "е) Кабинет 06 - Кабинет Главы Департамента Культуры",
        "ё) Кабинет 07 - Кабинет Генерального прокурора",
      ],
    },
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">План капитолия</h1>

      <div className="space-y-12">
        {floorPlans.map((floor) => (
          <Card key={floor.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2 relative">
                  <div className="aspect-[3/2] relative">
                    <Image
                      src={floor.image || "/placeholder.svg"}
                      alt={`План ${floor.title}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="lg:w-1/2 p-6">
                  <h2 className="text-2xl font-bold mb-4">{floor.title}</h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <ul className="space-y-2">
                      {floor.rooms.map((room, index) => (
                        <li key={index} className="flex">
                          <span className="font-medium">{room}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

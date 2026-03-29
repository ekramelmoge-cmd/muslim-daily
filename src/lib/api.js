export async function fetchPrayerTimes(lat, lng, method = 2) {
  const date = new Date()
  const dd = String(date.getDate()).padStart(2,'0')
  const mm = String(date.getMonth()+1).padStart(2,'0')
  const yyyy = date.getFullYear()
  const url = `https://api.aladhan.com/v1/timings/${dd}-${mm}-${yyyy}?latitude=${lat}&longitude=${lng}&method=${method}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Prayer times fetch failed')
  const { data } = await res.json()
  return data
}

export async function fetchQibla(lat, lng) {
  const url = `https://api.aladhan.com/v1/qibla/${lat}/${lng}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Qibla fetch failed')
  const { data } = await res.json()
  return data.direction
}

export async function fetchSurahList() {
  const res = await fetch('https://api.alquran.cloud/v1/surah')
  if (!res.ok) throw new Error('Surah list fetch failed')
  const { data } = await res.json()
  return data
}

export async function fetchSurah(number) {
  const [arRes, enRes] = await Promise.all([
    fetch(`https://api.alquran.cloud/v1/surah/${number}/quran-simple`),
    fetch(`https://api.alquran.cloud/v1/surah/${number}/en.sahih`),
  ])
  const [ar, en] = await Promise.all([arRes.json(), enRes.json()])
  const hasBismillah = ar.data.ayahs[0]?.text?.startsWith('\u0628\u0650\u0633\u0652\u0645\u0650')
  const ayahs = ar.data.ayahs.map((a, i) => {
    let arabic = a.text
    let english = en.data.ayahs[i]?.text ?? ''
    if (i === 0 && number !== 1 && number !== 9 && hasBismillah) {
      const parts = arabic.split(' ')
      arabic = parts.slice(4).join(' ').trim()
      english = english.replace(/^In the name of Allah.*?Merciful\.\s*/i, '').trim()
    }
    return { number: a.numberInSurah, arabic, english }
  })
  if (number !== 1 && number !== 9) {
    ayahs.unshift({
      number: 'B',
      arabic: '\u0628\u0650\u0633\u0652\u0645\u0650 \u0627\u0644\u0644\u0651\u064e\u0647\u0650 \u0627\u0644\u0631\u0651\u064e\u062d\u0652\u0645\u064e\u0670\u0646\u0650 \u0627\u0644\u0631\u0651\u064e\u062d\u0650\u064a\u0645\u0650',
      english: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
      isBismillah: true,
    })
  }
  return { number: ar.data.number, name: ar.data.name, englishName: ar.data.englishName, meaning: ar.data.englishNameTranslation, type: ar.data.revelationType, ayahs }
}

export function getAdhanUrl(reciterKey = 'mishary') {
  const editions = { mishary:'ar.alafasy', abdulbasit:'ar.abdulsamad', sudais:'ar.husary' }
  return `https://cdn.islamic.network/quran/audio/128/${editions[reciterKey]}/1.mp3`
}

export function getAyahAudioUrl(ayahNum, reciterKey = 'mishary') {
  const editions = { mishary:'ar.alafasy', abdulbasit:'ar.abdulsamad', sudais:'ar.husary' }
  return `https://cdn.islamic.network/quran/audio/128/${editions[reciterKey]}/${ayahNum}.mp3`
}

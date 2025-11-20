import { addQuotes, updateSchedule } from './quotes'

// Sample quotes pool for each category (in production, this would come from an API or database)
const quotePools = {
  'Love Quotes': [
    "Love is composed of a single soul inhabiting two bodies.",
    "The best thing to hold onto in life is each other.",
    "I love you not only for what you are, but for what I am when I am with you.",
    "Love is when the other person's happiness is more important than your own.",
    "In all the world, there is no heart for me like yours.",
    "You are my today and all of my tomorrows.",
    "I saw that you were perfect, and so I loved you. Then I saw that you were not perfect and I loved you even more.",
    "Love is not about how much you say 'I love you', but how much you prove that it's true.",
    "The best love is the kind that awakens the soul and makes us reach for more.",
    "I would rather spend one lifetime with you, than face all the ages of this world alone.",
  ],
  'Attitude Status': [
    "I don't need a perfect person, I need someone who makes me feel perfect.",
    "My attitude is based on how you treat me.",
    "I'm not perfect, but I'm limited edition.",
    "I am who I am, and I don't need to prove anything to anyone.",
    "I don't follow the crowd, I make my own path.",
    "My attitude is my choice, and I choose to be positive.",
    "I'm not here to be perfect, I'm here to be real.",
    "I don't need your approval to be myself.",
    "My attitude is my superpower.",
    "I'm not rude, I'm just honest and you're not used to it.",
  ],
  'Shayari': [
    "Dil ki baat labon tak aayi, Shayari ban kar rah gayi.",
    "Mohabbat ek aisi kitaab hai, Jise padh kar dil ko sukoon milta hai.",
    "Zindagi mein kuch pal aise aate hain, Jo hamesha yaad rahte hain.",
    "Dil se nikli hai jo baat, Woh shayari ban kar rah gayi.",
    "Mohabbat ka matlab samjha nahi, Par dil ne man li hai.",
    "Aankhon mein khwab hai, Dil mein umeed hai, Zindagi mein tum ho.",
    "Dil ki dhadkan tumse milti hai, Har saans tumhari yaad deti hai.",
    "Mohabbat ki raah mein, Har kadam naya safar hai.",
    "Dil se jo nikli hai baat, Woh shayari hai yaad.",
    "Tumhari yaadon mein kho jata hoon, Har pal tumhare saath rehta hoon.",
  ],
  'Motivation Quotes': [
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The only way to do great work is to love what you do.",
    "Believe you can and you're halfway there.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "It does not matter how slowly you go as long as you do not stop.",
    "The only limit to our realization of tomorrow will be our doubts of today.",
    "You are never too old to set another goal or to dream a new dream.",
    "The way to get started is to quit talking and begin doing.",
    "Don't watch the clock; do what it does. Keep going.",
    "The only person you are destined to become is the person you decide to be.",
  ],
  'Festival Wishes': [
    "May this festival bring joy, happiness, and prosperity to your life. Happy Diwali!",
    "Wishing you a year filled with happiness, success, and new opportunities. Happy New Year!",
    "May the colors of Holi fill your life with happiness and joy. Happy Holi!",
    "May this Eid bring peace, happiness, and prosperity to your life. Eid Mubarak!",
    "Wishing you a Christmas filled with love, joy, and happiness. Merry Christmas!",
    "May this festival bring you closer to your loved ones. Happy celebrations!",
    "Wishing you and your family a very happy and prosperous festival!",
    "May the divine blessings of this festival bring you peace and happiness!",
    "Hope this festival brings lots of happiness and success in your life!",
    "Wishing you a wonderful festival filled with love, laughter, and joy!",
  ],
}

// Get random quotes from pool
function getRandomQuotes(category, count = 2) {
  const pool = quotePools[category] || []
  const shuffled = [...pool].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count).map(text => ({
    text,
    category,
    author: 'Unknown',
  }))
}

// Auto-update function - adds 2 quotes per category
export function performAutoUpdate() {
  const categories = ['Love Quotes', 'Attitude Status', 'Shayari', 'Motivation Quotes', 'Festival Wishes']
  let totalAdded = 0
  
  categories.forEach(category => {
    try {
      const newQuotes = getRandomQuotes(category, 2)
      if (newQuotes.length > 0) {
        addQuotes(newQuotes)
        updateSchedule(category, newQuotes.length)
        totalAdded += newQuotes.length
        console.log(`✅ Added ${newQuotes.length} new quotes to ${category}`)
      }
    } catch (error) {
      console.error(`❌ Error updating ${category}:`, error)
    }
  })
  
  console.log(`🔄 Auto-update completed: ${totalAdded} quotes added at ${new Date().toISOString()}`)
  return totalAdded
}

// Manual update function (can be called via API)
export function runManualUpdate() {
  console.log('🔄 Running manual update...')
  return performAutoUpdate()
}


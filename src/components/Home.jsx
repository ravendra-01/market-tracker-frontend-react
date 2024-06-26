import mainImage from '../../public/stock.jpg'
import ContactForm from './ContactForm'

function Main() {
  return(
    <main className="container mx-auto p-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h1 className="text-4xl font-bold text-purple-700">We Make The Markets</h1>
        <h1 className="text-4xl font-bold text-yellow-500">Make Sense</h1>
        <p className="mt-4 text-gray-700">Our mission is to make sense of what the news means to you and your money. Every day we work to provide the information you need to achieve success in money and in life. We invite you to subscribe to MarketWatch. Support our journalism and join us on the journey to a better financial tomorrow.</p>
        <br />
        <h1 className="font-bold text-purple-700">What are the subscriber benefits of a MarketWatch subscription?</h1>
        <p className="mt-4 text-gray-700">To be a MarketWatch subscriber is to support our journalism and experience MarketWatch at its best. You will gain full access to all of MarketWatch's original reporting. Moreover, a subscription entitles you to an advertising-light reader experience. You will see fewer ads and experience faster load speed. As a paid subscriber you will also gain access to exclusive MarketWatch coverage and special reports.</p>
        <ContactForm />
      </div>
      <div className="p-6">
        <img src={mainImage} alt="Main Image" className='border-5 rounded-2xl shadow-lg'/>
      </div>
    </main>
  )
}

export default Main
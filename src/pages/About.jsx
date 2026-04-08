import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
      <Title text1={'ABOUT'} text2={'US'}/>
    </div>
    <div className='my-10 flex flex-col md:flex-row gap-16'>
      <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
      <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Welcome to Forever, where we believe in bringing you the finest Garmet designed to make your life better. Founded in 2026 in Cuttack, our mission is to provide high-quality products that marry style with functionality. We are passionate about </p>
        <p>At Forever, we believe that quality and service should never be a luxury. That is why we work closely with trusted suppliers to ensure every item in our collection meets the highest standards of craftsmanship and durability. Our team is committed to providing a seamless shopping experience, from the moment you browse our site to the day your package arrives at your door. We are driven by a simple mission: to deliver products that solve your problems and bring a smile to your face, all while offering the friendly support you deserve</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Our mission is to bridge the gap between high-end quality and everyday affordability. We strive to empower our customers by providing carefully curated products that enhance your daily life without compromising on integrity or ethics. By focusing on innovation and customer-first values, we aim to build a community where every purchase feels like a step toward a better, more inspired lifestyle</p>
      </div>
    </div>
    <div className='text-4xl py-4'>
      <Title text1={'WHY'} text2={'CHOOSE US'}/>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Every product we offer undergoes a rigorous quality check to ensure it meets our exacting standards before it ever reaches your hands.</p>
        </div>
         <div className='border px-10 md:px-16 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>From our intuitive browsing to our lightning-fast checkout, we’ve designed every step of your journey to be as effortless and stress-free as possible.</p>
        </div>
         <div className='border px-10 md:px-16 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Our dedicated support team is always on standby to ensure your questions are answered and your needs are met with the care and speed you deserve.</p>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
    </div>
    
  )
}

export default About
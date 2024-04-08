import React from 'react'

export default function CoursePage() {
    return (
        <div className='container m-auto p-4 mt-10 pt-2 flex'>
            <div className='min-w-64 rounded-2xl shadow-lg mr-8 pb-3'>
                <img src='CH1245.webp' className='rounded-t-2xl' />
                <div className='p-2'>
                    <div className='text-lg' style={{fontWeight: 'medium'}}>Advanced Security Course</div>
                    <div className='text-xl' style={{fontWeight: 'bold'}}>$10.99</div>
                    <div className='rounded-full bg-emerald-700 text-white mt-2 py-1 text-center'>Buy Now</div>
                    <div className='rounded-full text-emerald-700 border-2 border-emerald-700 mt-2 py-1 text-center'>Add to Wishlist</div>
                </div>
            </div>
            <div>
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis dui velit, in eleifend nisi posuere eget. Vivamus vehicula ligula ac leo consectetur, quis imperdiet felis posuere. Morbi fringilla vulputate rutrum. Aenean blandit risus ac viverra pretium. In tincidunt nunc sit amet tortor maximus molestie. Vivamus nulla enim, finibus nec hendrerit a, dapibus at quam. Maecenas posuere faucibus posuere. Aenean sit amet sagittis nisi.</div>
                <div className='flex gap-12 pl-6 mt-4 mb-4'>
                    <ul className='list-disc'>
                        <li>Lorem ipsum dolor sit amet</li>
                        <li>Lorem ipsum dolor sit amet</li>
                        <li>Lorem ipsum dolor sit amet</li>
                        <li>Lorem ipsum dolor sit amet</li>
                        <li>Lorem ipsum dolor sit amet</li>
                        <li>Lorem ipsum dolor sit amet</li>
                    </ul>
                    <ul className='list-disc'>
                        <li>Lorem ipsum dolor sit amet</li>
                        <li>Lorem ipsum dolor sit amet</li>
                        <li>Lorem ipsum dolor sit amet</li>
                        <li>Lorem ipsum dolor sit amet</li>
                        <li>Lorem ipsum dolor sit amet</li>
                        <li>Lorem ipsum dolor sit amet</li>
                    </ul>
                </div>
                <div className='flex items-center'>
                    <div className='w-8 h-8 rounded-full bg-zinc-400 mr-2'></div>
                    <div>by John Doe</div>
                </div>
            </div>
        </div>
    )
}

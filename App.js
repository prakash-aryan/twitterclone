import React, { useState, useEffect } from 'react';
import { Home, Search, Bell, Mail, Bookmark, ListOrdered, User, MoreHorizontal, Image, BarChart2, Smile, Calendar, MessageCircle, Repeat, Heart, Share, Twitter } from 'lucide-react';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('Home');

  return (
    <div className="w-64 h-screen px-4 py-3 flex flex-col text-white">
      <div className="text-3xl text-white p-3 mb-4 transition-transform duration-300 ease-in-out hover:scale-110">
        <Twitter />
      </div>
      {[
        { icon: Home, text: 'Home' },
        { icon: Search, text: 'Explore' },
        { icon: Bell, text: 'Notifications' },
        { icon: Mail, text: 'Messages' },
        { icon: Bookmark, text: 'Bookmarks' },
        { icon: ListOrdered, text: 'Lists' },
        { icon: User, text: 'Profile' },
        { icon: MoreHorizontal, text: 'More' },
      ].map(({ icon: Icon, text }) => (
        <div
          key={text}
          className={`flex items-center text-xl rounded-full px-4 py-3 cursor-pointer transition-colors duration-300 ${
            activeItem === text ? 'font-bold bg-gray-800' : 'hover:bg-gray-800'
          }`}
          onClick={() => setActiveItem(text)}
        >
          <Icon size={26} />
          <span className="ml-4">{text}</span>
        </div>
      ))}
      <button className="mt-4 bg-blue-500 text-white rounded-full py-3 px-8 text-lg font-bold hover:bg-blue-600 transition-colors duration-300">
        Post
      </button>
    </div>
  );
};

const Tweet = ({ author, username, avatar, content, image, timestamp, likes, comments, retweets }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <div className="border-b border-gray-800 p-4 hover:bg-gray-900 transition-colors duration-300">
      <div className="flex space-x-3">
        <img src={avatar} alt={`${author}'s avatar`} className="w-12 h-12 rounded-full" />
        <div className="flex-1">
          <div className="flex items-center space-x-1">
            <span className="font-bold text-white">{author}</span>
            <span className="text-gray-500">@{username} · {timestamp}</span>
          </div>
          <p className="mt-2 text-white">{content}</p>
          {image && <img src={image} alt="Tweet image" className="mt-3 rounded-2xl max-h-80 w-full object-cover" />}
          <div className="flex justify-between mt-4 text-gray-500 max-w-md">
            <button className="flex items-center space-x-1 hover:text-blue-400 transition-colors duration-300">
              <MessageCircle size={18} />
              <span>{comments}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-green-400 transition-colors duration-300">
              <Repeat size={18} />
              <span>{retweets}</span>
            </button>
            <button
              className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : 'hover:text-red-500'} transition-colors duration-300`}
              onClick={handleLike}
            >
              <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
              <span>{likeCount}</span>
            </button>
            <button className="hover:text-blue-400 transition-colors duration-300">
              <Share size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TweetForm = ({ avatar }) => {
  const [tweetContent, setTweetContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tweetContent.trim()) {
      console.log('Tweet submitted:', tweetContent);
      setTweetContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-b border-gray-800 p-4">
      <div className="flex space-x-4">
        <img src={avatar} alt="Your avatar" className="w-12 h-12 rounded-full" />
        <div className="flex-1">
          <textarea
            className="w-full bg-transparent border-b border-gray-800 focus:outline-none resize-none text-lg text-white"
            placeholder="What's new in web development?"
            rows="3"
            value={tweetContent}
            onChange={(e) => setTweetContent(e.target.value)}
          />
          <div className="flex justify-between items-center mt-4">
            <div className="flex space-x-2 text-blue-400">
              <button type="button" className="hover:text-blue-300 transition-colors duration-300"><Image size={20} /></button>
              <button type="button" className="hover:text-blue-300 transition-colors duration-300"><BarChart2 size={20} /></button>
              <button type="button" className="hover:text-blue-300 transition-colors duration-300"><Smile size={20} /></button>
              <button type="button" className="hover:text-blue-300 transition-colors duration-300"><Calendar size={20} /></button>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-full px-6 py-2 font-bold hover:bg-blue-600 transition-colors duration-300 disabled:opacity-50"
              disabled={!tweetContent.trim()}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

const WhatsHappening = () => {
  const [expandedTrend, setExpandedTrend] = useState(null);

  const trends = [
    { tag: 'React 19', category: 'JavaScript · Trending', tweets: '45.2K posts', details: 'React 19 brings server components and improved performance.' },
    { tag: '#TailwindCSS', category: 'Web Development · Trending', tweets: '32.8K posts', details: 'Developers discuss the pros and cons of utility-first CSS.' },
    { tag: 'TypeScript 5.0', category: 'Programming · Live', location: 'Trending worldwide', details: 'New features in TypeScript 5.0 are creating buzz in the dev community.' },
    { tag: 'CSS Grid vs Flexbox', category: 'Web Design · Trending', tweets: '18.6K posts', details: 'Developers debate the best use cases for CSS Grid and Flexbox.' },
    { tag: '#WebAssembly', category: 'Technology · Trending', tweets: '12.3K posts', details: 'WebAssembly is gaining traction for high-performance web applications.' },
  ];

  return (
    <div className="bg-gray-900 rounded-2xl mb-4">
      <h2 className="font-bold text-xl p-4 text-white">What's happening in tech</h2>
      {trends.map((trend, index) => (
        <div key={index} className="px-4 py-3 hover:bg-gray-800 cursor-pointer transition-colors duration-300" onClick={() => setExpandedTrend(expandedTrend === index ? null : index)}>
          {trend.category && <div className="text-gray-500 text-sm">{trend.category}</div>}
          <div className="font-bold text-white">{trend.tag}</div>
          {trend.location && <div className="text-gray-500 text-sm">{trend.location}</div>}
          {trend.tweets && <div className="text-gray-500 text-sm">{trend.tweets}</div>}
          {expandedTrend === index && (
            <div className="mt-2 text-sm text-gray-300 animate-fadeIn">{trend.details}</div>
          )}
        </div>
      ))}
      <div className="p-4 text-blue-400 hover:bg-gray-800 cursor-pointer transition-colors duration-300">Show more</div>
    </div>
  );
};

const WhoToFollow = () => {
  const [followState, setFollowState] = useState({ 'dan_abramov': false, 'sarah_edo': false });

  const handleFollow = (username) => {
    setFollowState(prev => ({ ...prev, [username]: !prev[username] }));
  };

  const users = [
    { name: 'Dan Abramov', username: 'dan_abramov', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { name: 'Sarah Drasner', username: 'sarah_edo', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
  ];

  return (
    <div className="bg-gray-900 rounded-2xl">
      <h2 className="font-bold text-xl p-4 text-white">Who to follow</h2>
      {users.map((user, index) => (
        <div key={index} className="px-4 py-3 hover:bg-gray-800 cursor-pointer transition-colors duration-300 flex items-center justify-between">
          <div className="flex items-center">
            <img src={user.avatar} alt={`${user.name}'s avatar`} className="w-12 h-12 rounded-full mr-3" />
            <div>
              <div className="font-bold text-white">{user.name}</div>
              <div className="text-gray-500">@{user.username}</div>
            </div>
          </div>
          <button
            onClick={() => handleFollow(user.username)}
            className={`${
              followState[user.username] ? 'bg-transparent text-white border border-white' : 'bg-white text-black'
            } rounded-full px-4 py-1 text-sm font-bold transition-all duration-300 hover:opacity-80`}
          >
            {followState[user.username] ? 'Following' : 'Follow'}
          </button>
        </div>
      ))}
      <div className="p-4 text-blue-400 hover:bg-gray-800 cursor-pointer transition-colors duration-300">Show more</div>
    </div>
  );
};

const App = () => {
  const [tweets, setTweets] = useState([
    {
      author: 'React',
      username: 'reactjs',
      avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
      content: 'Exciting news! React 19 is on the horizon. Get ready for improved performance, better debugging tools, and enhanced server components. What feature are you most looking forward to? #React19 #JavaScript',
      timestamp: '2h',
      likes: 1234,
      comments: 567,
      retweets: 89
    },
    {
      author: 'WebDev Insider',
      username: 'webdev_insider',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
      content: 'The future of web development is here! Check out this infographic on the most in-demand skills for 2023. #WebDev #TechSkills',
      image: 'https://cdn.stackoverflow.co/images/jo7n4k8s/production/6d2b9eca8c9e3fdc57c12c866b687aee11ae9dc0-853x285.png?auto=format',
      timestamp: '1h',
      likes: 1543,
      comments: 234,
      retweets: 567
    },
    {
      author: 'TailwindCSS',
      username: 'tailwindcss',
      avatar: 'https://randomuser.me/api/portraits/lego/2.jpg',
      content: 'Just released: Tailwind CSS v3.3 with exciting new features including CSS variables support, custom font smoothing, and more utilities! Check out the docs for a full breakdown. #TailwindCSS #WebDev',
      timestamp: '4h',
      likes: 982,
      comments: 345,
      retweets: 67
    },
  ]);

  const addNewTweet = (content) => {
    const newTweet = {
      author: 'You',
      username: 'your_username',
      avatar: 'https://randomuser.me/api/portraits/lego/5.jpg',
      content: content,
      timestamp: 'Just now',
      likes: 0,
      comments: 0,
      retweets: 0
    };
    setTweets([newTweet, ...tweets]);
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center">
      <div className="max-w-screen-xl w-full flex">
        <Sidebar />
        <main className="flex-grow max-w-[600px] border-x border-gray-800">
          <div className="sticky top-0 bg-black bg-opacity-70 backdrop-blur-md p-4 border-b border-gray-800 z-10">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold">Home</h1>
              <div className="flex space-x-4">
                <span className="font-bold">For you</span>
                <span className="text-gray-500">Following</span>
              </div>
            </div>
          </div>
          <TweetForm avatar="https://randomuser.me/api/portraits/lego/5.jpg" onTweetSubmit={addNewTweet} />
          <div className="border-b border-gray-800 p-4">
            <h2 className="font-bold text-xl">Boost Your Web Dev Skills</h2>
            <p className="text-gray-500 mt-2">Follow top developers, join tech discussions, and stay updated with the latest in web development.</p>
            <button className="mt-4 bg-white text-black rounded-full py-2 px-4 font-bold hover:bg-gray-200 transition-colors duration-300">
              Explore Web Dev
            </button>
          </div>
          {tweets.map((tweet, index) => (
            <Tweet key={index} {...tweet} />
          ))}
        </main>
        <aside className="w-[350px] pl-8 py-3">
          <div className="sticky top-3">
            <div className="relative mb-4">
              <input type="text" placeholder="Search Web Dev topics" className="w-full bg-gray-900 rounded-full py-2 px-4 pl-12 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300" />
              <div className="absolute left-4 top-2.5 text-gray-400">
                <Search size={20} />
              </div>
            </div>
            <div className="bg-gray-900 rounded-2xl p-4 mb-4">
              <h2 className="font-bold text-xl mb-2">Upgrade to Pro</h2>
              <p className="text-gray-300 mb-4">Get exclusive access to advanced web development resources and tools.</p>
              <button className="bg-blue-500 text-white rounded-full py-2 px-4 font-bold w-full hover:bg-blue-600 transition-colors duration-300 transform hover:scale-105">
                Upgrade Now
              </button>
            </div>
            <WhatsHappening />
            <WhoToFollow />
          </div>
        </aside>
      </div>
    </div>
  );
};

// Add these styles to your global CSS or in a style tag
const globalStyles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-in-out;
  }
`;

export default function AppWrapper() {
  return (
    <>
      <style>{globalStyles}</style>
      <App />
    </>
  );
}
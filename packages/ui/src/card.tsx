import React from 'react';

interface Blog {

}

const Card: React.FC<Blog> = ({ blog }) => {
  return (
    <div className="mb-8 border-b border-gray-300 py-4 flex items-center">
      <img className="w-24 h-24 object-cover rounded-full mr-4" src={blog?.slug} alt={blog?.name} />
      <div>
        <h2 className="text-xl font-semibold">{blog?.name}</h2>
        <p className="text-gray-600">{blog?.content}</p>
      </div>
    </div>
  );
};

export default Card;

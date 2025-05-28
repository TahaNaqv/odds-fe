
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Twitter, Heart, MessageCircle, Repeat, ExternalLink } from 'lucide-react';

const TwitterFeedSection = () => {
  const tweets = [
    {
      id: 1,
      author: "@CryptoWinner23",
      content: "Just won 2.3 ETH on @odds_dev! 🎉 The transparency is incredible - you can verify everything on-chain. This is how raffles should work! #Web3 #Base",
      likes: 45,
      retweets: 23,
      replies: 8,
      verified: true
    },
    {
      id: 2,
      author: "@DeFiEnthusiast",
      content: "Been using Ødds for 3 weeks now. Love how you can see exactly how the random numbers are generated. No more wondering if traditional raffles are rigged! 🎲",
      likes: 67,
      retweets: 34,
      replies: 12,
      verified: false
    },
    {
      id: 3,
      author: "@BaseBuilder",
      content: "The fact that @odds_dev chose Base for their platform shows they care about user experience. Low fees + fast transactions = perfect for daily raffles 🚀",
      likes: 89,
      retweets: 56,
      replies: 19,
      verified: true
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-blue-500/5 to-cyan-500/5">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What the <span className="text-blue-400">Community</span> Says
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Real testimonials from our growing Twitter community. Join the conversation!
          </p>
          
          <Button 
            size="lg" 
            onClick={() => window.open('https://x.com/odds_dev', '_blank')}
            className="bg-blue-500 hover:bg-blue-600 px-8"
          >
            <Twitter className="mr-2 h-5 w-5" />
            Follow @odds_dev
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {tweets.map((tweet) => (
            <Card key={tweet.id} className="bg-card/70 backdrop-blur-sm border-blue-400/20 hover:border-blue-400/40 transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Twitter className="mr-2 h-5 w-5 text-blue-400" />
                  <span className="text-blue-400">{tweet.author}</span>
                  {tweet.verified && (
                    <Badge variant="info" className="ml-2 text-xs">
                      ✓
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {tweet.content}
                </p>
                <div className="flex items-center justify-between text-gray-400 text-sm">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Heart className="mr-1 h-4 w-4" />
                      {tweet.likes}
                    </span>
                    <span className="flex items-center">
                      <Repeat className="mr-1 h-4 w-4" />
                      {tweet.retweets}
                    </span>
                    <span className="flex items-center">
                      <MessageCircle className="mr-1 h-4 w-4" />
                      {tweet.replies}
                    </span>
                  </div>
                  <ExternalLink className="h-4 w-4 opacity-50 hover:opacity-100 cursor-pointer" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-400 mb-4">
            Share your wins and tag us for a chance to be featured!
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              const text = "Just discovered @odds_dev - the fairest on-chain raffle platform! 🎲 #Web3 #Base #DeFi";
              window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
            }}
          >
            <Twitter className="mr-2 h-4 w-4" />
            Tweet about Ødds
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TwitterFeedSection;

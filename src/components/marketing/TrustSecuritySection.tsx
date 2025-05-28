
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Eye, Code, ExternalLink, CheckCircle } from 'lucide-react';

const TrustSecuritySection = () => {
  const securityFeatures = [
    {
      icon: Shield,
      title: "Audited Smart Contracts",
      description: "Our contracts have been reviewed by security experts",
      status: "Verified",
      link: "#"
    },
    {
      icon: Eye,
      title: "Open Source Code",
      description: "Complete transparency - inspect our code yourself",
      status: "Public",
      link: "#"
    },
    {
      icon: Code,
      title: "On-Chain Verification",
      description: "Every raffle result can be verified on Base blockchain",
      status: "Live",
      link: "#"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Badge variant="success" className="mb-4 px-4 py-2">
            <CheckCircle className="mr-2 h-4 w-4" />
            Security First
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Built for <span className="text-app-green">Trust</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            In web3, trust is earned through transparency and verifiability. 
            That's why we've built Ødds to be completely open and auditable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {securityFeatures.map((feature, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-app-green/20 hover:border-app-green/40 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <feature.icon className="h-12 w-12 text-app-green" />
                  <Badge variant="success">{feature.status}</Badge>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">{feature.description}</p>
                <Button variant="outline" size="sm" className="w-full">
                  View Details <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-app-green/10 to-app-blue/10 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Verify Everything Yourself</h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Don't trust, verify. Every raffle draw, every winner selection, and every payout 
            is recorded on the Base blockchain for anyone to audit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline">
              <Eye className="mr-2 h-5 w-5" />
              View on BaseScan
            </Button>
            <Button size="lg" variant="outline">
              <Code className="mr-2 h-5 w-5" />
              Check Smart Contracts
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSecuritySection;

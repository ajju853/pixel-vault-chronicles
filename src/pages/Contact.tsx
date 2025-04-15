
import React, { useState } from 'react';
import { Send, Mail, Github, Twitter, Linkedin } from 'lucide-react';
import NavBar from '../components/NavBar';
import StarfieldBackground from '../components/StarfieldBackground';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Play typing sound
    const typingSound = new Audio('/sounds/typing.mp3');
    typingSound.volume = 0.1;
    typingSound.playbackRate = 2;
    typingSound.play().catch(error => console.error('Error playing typing sound:', error));
    
    // Increment typing index for animation effects
    setTypingIndex(prev => prev + 1);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Play submit sound
    const submitSound = new Audio('/sounds/submit.mp3');
    submitSound.volume = 0.3;
    submitSound.play().catch(error => console.error('Error playing submit sound:', error));
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 1500);
  };
  
  return (
    <>
      <StarfieldBackground />
      <NavBar />
      
      <main className="min-h-screen pt-16 crt-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-pixel text-cyber-neon-green mb-4">ESTABLISH CONNECTION</h1>
            <p className="text-gray-300 font-future max-w-3xl mb-8">
              Ready to transmit a message across the digital void? Use this secure communication channel to reach the pixel master directly.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <form onSubmit={handleSubmit} className="border-2 border-cyber-neon-blue pixel-corners p-6 bg-cyber-dark bg-opacity-80">
                  <h2 className="font-pixel text-cyber-neon-blue mb-6 flex items-center gap-2">
                    <Mail size={16} />
                    <span>TRANSMISSION FORM</span>
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-cyber-neon-green text-sm font-mono mb-1">YOUR ID</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-cyber-black border border-cyber-neon-blue/50 text-white px-3 py-2 focus:outline-none focus:border-cyber-neon-blue placeholder-gray-600"
                        placeholder="Enter your name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-cyber-neon-green text-sm font-mono mb-1">COMMUNICATION CHANNEL</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-cyber-black border border-cyber-neon-blue/50 text-white px-3 py-2 focus:outline-none focus:border-cyber-neon-blue placeholder-gray-600"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-cyber-neon-green text-sm font-mono mb-1">TRANSMISSION SUBJECT</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-cyber-black border border-cyber-neon-blue/50 text-white px-3 py-2 focus:outline-none focus:border-cyber-neon-blue placeholder-gray-600"
                      placeholder="Enter message subject"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-cyber-neon-green text-sm font-mono mb-1">MESSAGE CONTENT</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full bg-cyber-black border border-cyber-neon-blue/50 text-white px-3 py-2 focus:outline-none focus:border-cyber-neon-blue placeholder-gray-600 resize-none"
                      placeholder="Enter your message"
                    />
                  </div>
                  
                  <div className="relative">
                    <button
                      type="submit"
                      disabled={isSubmitting || isSuccess}
                      className={`flex items-center justify-center gap-2 w-full font-pixel py-3 transition-all ${
                        isSuccess
                          ? 'bg-cyber-neon-green text-cyber-black'
                          : isSubmitting
                          ? 'bg-cyber-neon-pink/50 text-white cursor-not-allowed'
                          : 'bg-cyber-neon-pink text-white hover:bg-cyber-neon-pink/80'
                      }`}
                    >
                      {isSuccess ? (
                        <>MESSAGE TRANSMITTED</>
                      ) : isSubmitting ? (
                        <>TRANSMITTING...</>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>TRANSMIT MESSAGE</span>
                        </>
                      )}
                    </button>
                    
                    {/* Progress bar for submitting state */}
                    {isSubmitting && (
                      <div className="absolute bottom-0 left-0 h-1 bg-cyber-neon-blue animate-pulse w-full"></div>
                    )}
                  </div>
                </form>
              </div>
              
              <div className="space-y-6">
                {/* Contact Info */}
                <div className="border border-cyber-neon-green pixel-corners p-4 bg-cyber-dark bg-opacity-80">
                  <h3 className="font-pixel text-cyber-neon-green mb-4">DIRECT CHANNELS</h3>
                  
                  <div className="space-y-4 font-mono text-sm">
                    <div>
                      <div className="text-cyber-neon-blue mb-1">ELECTRONIC MAIL</div>
                      <a 
                        href="mailto:contact@pixelvault.com" 
                        className="text-white hover:text-cyber-neon-green transition-colors"
                      >
                        contact@pixelvault.com
                      </a>
                    </div>
                    
                    <div>
                      <div className="text-cyber-neon-blue mb-1">LOCATION</div>
                      <p className="text-white">Neo Tokyo, Sector 7</p>
                    </div>
                    
                    <div>
                      <div className="text-cyber-neon-blue mb-1">RESPONSE TIME</div>
                      <p className="text-white">48 hours (standard timeline)</p>
                    </div>
                  </div>
                </div>
                
                {/* Social Links */}
                <div className="border border-cyber-neon-pink pixel-corners p-4 bg-cyber-dark bg-opacity-80">
                  <h3 className="font-pixel text-cyber-neon-pink mb-4">NETWORK NODES</h3>
                  
                  <div className="space-y-3">
                    <a 
                      href="#" 
                      className="flex items-center gap-3 text-white hover:text-cyber-neon-pink transition-colors"
                    >
                      <Github size={20} />
                      <span>github.com/pixelvault</span>
                    </a>
                    
                    <a 
                      href="#" 
                      className="flex items-center gap-3 text-white hover:text-cyber-neon-blue transition-colors"
                    >
                      <Twitter size={20} />
                      <span>twitter.com/pixelvault</span>
                    </a>
                    
                    <a 
                      href="#" 
                      className="flex items-center gap-3 text-white hover:text-cyber-neon-green transition-colors"
                    >
                      <Linkedin size={20} />
                      <span>linkedin.com/pixelvault</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;

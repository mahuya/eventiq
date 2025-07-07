import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Target, Users, TrendingUp, Loader2, Linkedin, MessageCircle } from "lucide-react";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [goal, setGoal] = useState("");
  const [eventLink, setEventLink] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    // Validate inputs
    if (!linkedinUrl.trim() || !goal.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in both LinkedIn URL and your goal.",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnalyzing(true);
    setApiResponse(null);
    
    console.log("Starting analysis with:", {
      linkedin_url: linkedinUrl.trim(),
      goal: goal.trim(),
      event_link: eventLink.trim() || ""
    });
    
    try {
      const requestBody = {
        linkedin_url: linkedinUrl.trim(),
        goal: goal.trim(),
        event_link: eventLink.trim() || ""
      };

      console.log("Calling edge function with:", requestBody);

      const response = await fetch("https://dolxahuhpjlqocogctca.supabase.co/functions/v1/analyze-event-fit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody)
      });
      
      console.log("Response status:", response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error Response:", errorData);
        throw new Error(errorData.error || `API Error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("API Response received:", data);
      setApiResponse(data);
      
      toast({
        title: "Analysis Complete",
        description: "Your event fit analysis has been completed successfully.",
      });
    } catch (error) {
      console.error("Analysis error:", error);
      
      toast({
        title: "Analysis Failed",
        description: error.message || "Unable to analyze event fit. Please try again.",
        variant: "destructive",
      });
    }
    
    setIsAnalyzing(false);
  };

  const parseApiResponse = () => {
    if (!apiResponse) {
      console.log("No API response available");
      return null;
    }

    console.log("Parsing API response:", apiResponse);

    // Check if we have the expected response structure
    if (apiResponse?.outputs?.[0]?.outputs?.[0]?.results?.message?.text) {
      const responseText = apiResponse.outputs[0].outputs[0].results.message.text;
      console.log("Extracted response text:", responseText);
      
      // Try to extract JSON from the response
      try {
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const jsonData = JSON.parse(jsonMatch[0]);
          console.log("Parsed JSON data:", jsonData);
          return jsonData;
        }
      } catch (e) {
        console.error("Failed to parse JSON from response:", e);
      }
      
      // If no JSON found, return the raw text
      return { summary: responseText };
    }
    
    // If response structure is different, try to extract any meaningful data
    if (typeof apiResponse === 'string') {
      return { summary: apiResponse };
    }
    
    // If we have any other structure, log it and return as summary
    console.log("Unexpected response structure, returning as summary");
    return { summary: JSON.stringify(apiResponse, null, 2) };
  };

  const parsedData = parseApiResponse();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-200/20 via-blue-200/20 to-pink-200/20 backdrop-blur-3xl"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-blue-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
      <div className="absolute -bottom-32 left-40 w-72 h-72 bg-pink-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-2000"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center py-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-4">
            EventIQ
          </h1>
          <p className="text-xl text-gray-600 font-medium">
            Reimagine event experiences, intelligently
          </p>
        </div>

        <div className="container mx-auto px-6 max-w-4xl space-y-8">
          {/* User Input Panel */}
          <Card className="bg-white/60 backdrop-blur-lg border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">Event Fit Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">LinkedIn Profile URL *</Label>
                <Input
                  placeholder="https://linkedin.com/in/your-profile"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  className="bg-white/50 border-white/30"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">What's your goal? *</Label>
                <Input
                  placeholder="e.g., Get more AI Strategist jobs"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="bg-white/50 border-white/30"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Event Link or Name</Label>
                <Input
                  placeholder="Event URL or name"
                  value={eventLink}
                  onChange={(e) => setEventLink(e.target.value)}
                  className="bg-white/50 border-white/30"
                />
              </div>
            </CardContent>
          </Card>

          {/* Primary CTA */}
          <div className="flex justify-center">
            <Button
              onClick={handleAnalyze}
              disabled={!linkedinUrl.trim() || !goal.trim() || isAnalyzing}
              className="h-16 px-12 text-lg font-semibold bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              style={{
                boxShadow: "8px 8px 16px rgba(147, 51, 234, 0.3), -8px -8px 16px rgba(255, 255, 255, 0.8)"
              }}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing Event Fit...
                </>
              ) : (
                "Analyze Event Fit"
              )}
            </Button>
          </div>

          {/* Output Panel - Only show if we have API response */}
          {parsedData && (
            <div className="space-y-8 animate-fade-in">
              {/* Fit Scorecard - Only show if we have structured data */}
              {parsedData.goal_fit && parsedData.network_boost && parsedData.brand_roi && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your Fit Scorecard</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-white/70 backdrop-blur-md border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6 text-center">
                        <div className="flex justify-center mb-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <Target className="w-6 h-6 text-purple-600" />
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2">Goal Fit</h3>
                        <p className="text-lg font-bold text-gray-900 mb-2">{parsedData.goal_fit}</p>
                        <p className="text-xs text-gray-600">How well this event supports your stated goal</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/70 backdrop-blur-md border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6 text-center">
                        <div className="flex justify-center mb-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <Users className="w-6 h-6 text-blue-600" />
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2">Network Boost</h3>
                        <p className="text-lg font-bold text-gray-900 mb-2">{parsedData.network_boost}</p>
                        <p className="text-xs text-gray-600">Potential to expand your professional network</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/70 backdrop-blur-md border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6 text-center">
                        <div className="flex justify-center mb-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-pink-600" />
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2">Brand ROI</h3>
                        <p className="text-lg font-bold text-gray-900 mb-2">{parsedData.brand_roi}</p>
                        <p className="text-xs text-gray-600">Visibility and branding opportunity at this event</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* Event Verdict Summary */}
              <Card className="bg-white/70 backdrop-blur-md border-white/30 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800 text-center">Event Verdict</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="text-left bg-gray-50 p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700">
                      {parsedData.summary || JSON.stringify(parsedData, null, 2)}
                    </pre>
                  </div>
                  
                  {/* Social Share Icons */}
                  <div className="flex justify-center space-x-4 py-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                      <Linkedin className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex items-center justify-center w-10 h-10 bg-black rounded-full cursor-pointer hover:bg-gray-800 transition-colors">
                      <X className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex items-center justify-center w-10 h-10 bg-green-500 rounded-full cursor-pointer hover:bg-green-600 transition-colors">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Empty State */}
          {!parsedData && !isAnalyzing && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                <Target className="w-12 h-12 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                Ready to find your perfect event match?
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Enter your LinkedIn profile and career goal to get personalized event recommendations.
              </p>
            </div>
          )}
        </div>

        {/* Copyright Footer */}
        <footer className="text-center py-8 mt-12">
          <p className="text-gray-500 text-sm">© Mahuya Ghosh 2025</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;

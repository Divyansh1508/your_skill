import {
  Users,
  Target,
  Award,
  Heart,
  Briefcase,
  GraduationCap,
  TrendingUp,
  CheckCircle,
} from "lucide-react";

function About() {
  const stats = [
    {
      number: "500+",
      label: "Students Trained",
      icon: <Users className="h-8 w-8" />,
    },
    {
      number: "100%",
      label: "Job Training Rate",
      icon: <Briefcase className="h-8 w-8" />,
    },
    {
      number: "2",
      label: "Professional Courses",
      icon: <GraduationCap className="h-8 w-8" />,
    },
    {
      number: "3",
      label: "Years Experience",
      icon: <Award className="h-8 w-8" />,
    },
  ];

  const values = [
    {
      icon: <Target className="h-12 w-12 text-primary-600" />,
      title: "Excellence in Education",
      description:
        "We are committed to delivering high-quality training that meets industry standards and prepares students for real-world challenges.",
    },
    {
      icon: <Heart className="h-12 w-12 text-error-500" />,
      title: "Student-Centric Approach",
      description:
        "Every student matters to us. We provide personalized attention and support to ensure each learner achieves their career goals.",
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-success-600" />,
      title: "Industry Relevance",
      description:
        "Our curriculum is constantly updated to reflect the latest industry trends and technologies, keeping our students ahead of the curve.",
    },
    {
      icon: <Briefcase className="h-12 w-12 text-secondary-600" />,
      title: "Career Opportunities",
      description:
        "We bridge the gap between education and employment by providing direct hiring opportunities to our successful graduates.",
    },
  ];

  const team = [
    {
      name: "Ayush Panwar",
      role: "Director",
      image:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
      description:
        "With 10+ years in tech industry, Rajesh founded ThinkAcademies to bridge the skill gap in digital marketing and web development.",
    },
    {
      name: "Vivek Kumar",
      role: "Head of Digital Marketing",
      image:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
      description:
        "Digital marketing expert with 8 years of experience helping brands grow their online presence and drive conversions.",
    },
    {
      name: "Divyansh Jain",
      role: "Lead Web Developer",
      image:
        "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400",
      description:
        "Full-stack developer passionate about teaching modern web technologies and helping students build amazing applications.",
    },
    {
      name: "Stuti Mehra",
      role: "Student Success Manager",
      image:
        "https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=400",
      description:
        "Dedicated to ensuring every student succeeds in their learning journey and achieves their career aspirations.",
    },
  ];

  const milestones = [
    {
      year: "2021",
      title: "Company Founded",
      description:
        "Yourskilll was established with a vision to provide quality tech education and create job opportunities.",
    },
    {
      year: "2022",
      title: "First 100 Students",
      description:
        "Successfully trained our first batch of 100 students with 100% job placement rate.",
    },
    {
      year: "2023",
      title: "Course Expansion",
      description:
        "Launched comprehensive Digital Marketing and Web Development programs with industry partnerships.",
    },
    {
      year: "2024",
      title: "Direct Hiring Program",
      description:
        "Introduced our unique hiring program where top performers get direct job opportunities in our company.",
    },
  ];

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-warning-400 to-warning-500">
                Yourskilll
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
              Empowering careers through quality education and creating pathways
              to success in the digital world.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-secondary-600 mb-6 leading-relaxed">
                At Yourskilll, we believe that quality education should be
                accessible to everyone. Our mission is to bridge the gap between
                academic learning and industry requirements by providing
                practical, hands-on training in high-demand skills.
              </p>
              <p className="text-lg text-secondary-600 mb-8 leading-relaxed">
                We don't just teach – we transform lives. Our unique approach
                combines expert instruction, real-world projects, and direct
                employment opportunities to ensure our students not only learn
                but also succeed in their careers.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-success-500 flex-shrink-0" />
                  <span className="text-secondary-800 font-medium">
                    Industry-relevant curriculum designed by experts
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-success-500 flex-shrink-0" />
                  <span className="text-secondary-800 font-medium">
                    Hands-on practical training with real projects
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-success-500 flex-shrink-0" />
                  <span className="text-secondary-800 font-medium">
                    Direct hiring opportunities for top performers
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-success-500 flex-shrink-0" />
                  <span className="text-secondary-800 font-medium">
                    Affordable pricing with maximum value
                  </span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Students learning"
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-primary-600 to-success-600 text-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold">100%</div>
                <div className="text-primary-100">Job Training Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-primary-100">
              These numbers reflect our commitment to student success and
              quality education
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4 text-primary-200">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-primary-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              These values guide everything we do and shape the way we interact
              with our students and partners
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-secondary-100"
              >
                <div className="flex items-center mb-4">
                  {value.icon}
                  <h3 className="text-xl font-bold text-secondary-900 ml-4">
                    {value.title}
                  </h3>
                </div>
                <p className="text-secondary-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Our passionate educators and industry experts are dedicated to
              your success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-secondary-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow border border-secondary-100"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-secondary-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-secondary-600 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey/Timeline Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-success-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              From a small startup to a leading training institute - here's how
              we've grown
            </p>
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-600 to-success-600 rounded-full"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"
                    }`}
                  >
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-primary-100">
                      <div className="text-2xl font-bold text-primary-600 mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-bold text-secondary-900 mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-secondary-600">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-gradient-to-r from-primary-600 to-success-600 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Why Choose Yourskilll?
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              We're not just another training institute - we're your career
              transformation partner
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Modern classroom"
                className="rounded-xl shadow-2xl"
              />
            </div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 p-3 rounded-lg flex-shrink-0">
                  <GraduationCap className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">
                    Expert-Led Training
                  </h3>
                  <p className="text-secondary-600">
                    Learn from industry professionals with years of real-world
                    experience.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-secondary-100 p-3 rounded-lg flex-shrink-0">
                  <Briefcase className="h-6 w-6 text-secondary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">
                    Direct Job Opportunities
                  </h3>
                  <p className="text-secondary-600">
                    Top performers get hired directly into our company - no job
                    hunting required!
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-success-100 p-3 rounded-lg flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-success-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">
                    Practical Learning
                  </h3>
                  <p className="text-secondary-600">
                    Work on real projects and build a portfolio that showcases
                    your skills.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-warning-100 p-3 rounded-lg flex-shrink-0">
                  <Heart className="h-6 w-6 text-warning-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">
                    Personalized Support
                  </h3>
                  <p className="text-secondary-600">
                    Get individual attention and mentorship throughout your
                    learning journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Join hundreds of successful graduates who have transformed their
            careers with Yourskilll. Your journey to success starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/courses"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-secondary-50 transition-colors shadow-lg"
            >
              Explore Our Training
            </a>
            <a
              href="/signup"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-600 transition-colors"
            >
              Start Your Journey
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;

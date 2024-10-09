import React, { useState, useContext, useEffect } from 'react';
import { Typography, Divider, Button } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Introduction from '../../components/generic/Introduction';
import Courses from '../../components/generic/courses/Courses';
import Categories from '../../components/generic/Categories';
import PageNumber from '../../components/generic/PageNumber';
import CategoryFilter from '../../components/generic/CategoryFilter';
import { AuthContext } from '../../context/AuthContext';
import coursesData from '../../data/courses.json';
import usersData from '../../data/users.json';
import categoriesData from '../../data/categories.json';
import { Category } from '../../models/Category';
import InstructorSlider from '../../components/generic/InstructorSlider';
import UtilityProgram from '../../components/generic/UtilityProgram';
import UtilityRegisterInformation from '../../components/generic/UtilityRegisterInformation';
import { UserRole } from '../../models/User';
const { Title } = Typography;

const HomePage: React.FC = () => {
  const { user: _user } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const totalCourses = coursesData.courses.length;
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All Courses');
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [sliderCategories, setSliderCategories] = useState<Category[][]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCategoryIndex((prevIndex) => (prevIndex + 1) % sliderCategories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [sliderCategories]);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories: Category[] = categoriesData.categories.map(cat => ({
        id: cat.id,
        user_id: cat.user_id,
        name: cat.name,
        description: cat.description,
        parent_category_id: cat.parent_category_id,
        created_at: cat.created_at,
        updated_at: cat.updated_at,
        is_deleted: cat.is_deleted
      }));

      // Divide categories into groups of 4
      const groupedCategories = [];
      for (let i = 0; i < fetchedCategories.length; i += 4) {
        groupedCategories.push(fetchedCategories.slice(i, i + 4));
      }
      setSliderCategories(groupedCategories);
    };

    fetchCategories();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setIsVisible(false);
    setTimeout(() => setIsVisible(true), 300);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const filteredCourses = activeCategory === 'All Courses'
    ? coursesData.courses
    : coursesData.courses.filter(course => course.category_id === activeCategory.toLowerCase().replace(' & ', '_'));

  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 bg-gradient-to-b from-indigo-50 to-white">
      <Introduction />
      <Divider className="my-16 border-indigo-200" />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 relative overflow-hidden"
      >
        <h1 className="text-center text-blue-500 text-2xl font-bold mb-8">Top Categories</h1>
        <h1 className="text-4xl font-bold text-center mb-12">
          Most demanding <span className="text-blue-500">Categories</span>.
        </h1>
        <div className="flex transition-transform duration-500 ease-in-out mb-12" style={{ transform: `translateX(-${currentCategoryIndex * 100}%)` }}>
          {sliderCategories.map((categoryGroup, groupIndex) => (
            <div key={groupIndex} className="w-full flex-shrink-0">
              <Categories categories={categoryGroup} />
            </div>
          ))}
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-2 mt-4 bottom-0">
          {sliderCategories.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentCategoryIndex ? 'bg-indigo-600 w-4' : 'bg-indigo-200'}`}
              onClick={() => setCurrentCategoryIndex(index)}
            ></button>
          ))}
        </div>
      </motion.div>

      <motion.section
        className="bg-gradient-to-b from-indigo-50 to-white py-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title level={2} className="text-6xl font-extrabold text-indigo-900 mb-16 text-center font-serif tracking-wide">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-indigo-900 font-serif tracking-wide"
          >
            Exquisite Learning Experiences
          </motion.span>
        </Title>
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        <AnimatePresence>
          {isVisible && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <Courses
                courses={paginatedCourses}
                usersData={{ users: (usersData?.users || []).map(user => ({
                  ...user,
                  role: user.role as UserRole,
                  dob: new Date(user.dob)
                })) }}
                categoriesData={{
                  categories: categoriesData.categories.map(cat => ({
                    ...cat,
                    // Remove the Date conversion
                  })),
                }}
              />            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      <div className="mt-12 flex justify-center">
        <PageNumber
          currentPage={currentPage}
          total={totalCourses}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </div>

      <Divider className="my-16 border-indigo-200" />
      <InstructorSlider />

      <Divider className="my-16 border-indigo-200" />
      <UtilityProgram />

      <Divider className="my-16 border-indigo-200" />
      <UtilityRegisterInformation />

      <Divider className="my-16 border-indigo-200" />
      <motion.section
        className="mt-24 text-center bg-gradient-to-b from-indigo-50 to-white py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Title level={2} className="text-5xl font-bold text-indigo-900 mb-8">
            Elevate Your Expertise
          </Title>
          <Link to="/courses">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button type="primary" size="large" className="bg-gradient-to-r from-[#ffd700] to-[#ffa500] hover:from-[#ffcc00] hover:to-[#ff9500] text-indigo-900 font-medium py-2 px-4 lg:px-6 rounded-full text-sm transition-all duration-200 ease-in-out shadow-md hover:shadow-lg hidden lg:inline-block">
                Explore All Premium Courses
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default HomePage;
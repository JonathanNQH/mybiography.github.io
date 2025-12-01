"use client";

import React, { useState, useEffect, useRef } from "react";
import TableOfContents from "@/components/TableOfContents";
import ImageModal from "@/components/ImageModal";
import MobileMenu from "@/components/MobileMenu";
import { cn } from "@/lib/utils"; // Import cn for conditional class names

interface ImageItem {
  src: string;
  alt: string;
}

const biographySections = [
  { id: "personal-introduction", title: "Personal Introduction" },
  { id: "profession-skills", title: "Profession & Skills" },
  { id: "experience", title: "Experience" },
  { id: "involvement", title: "Involvement" },
  { id: "qualification", title: "Qualification" },
  { id: "self-development", title: "Self Development" },
];

const sectionImages: { [key: string]: ImageItem } = {
  "personal-introduction": { src: "/images/ng-qi-heng-passport.png", alt: "NG QI HENG Passport Photo" },
  "profession-skills": { src: "https://picsum.photos/id/1018/600/400", alt: "Profession & Skills" },
  "experience": { src: "https://picsum.photos/id/1040/600/400", alt: "Experience" },
  "involvement": { src: "https://picsum.photos/id/1074/600/400", alt: "Involvement" },
  "qualification": { src: "https://picsum.photos/id/1005/600/400", alt: "Qualification" },
  "self-development": { src: "https://picsum.photos/id/1006/600/400", alt: "Self Development" },
};

const Biography = () => {
  const [activeSectionId, setActiveSectionId] = useState<string | undefined>(undefined);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const imageRefs = useRef<{ [key: string]: HTMLImageElement | null }>({});
  const [visibleImages, setVisibleImages] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {};
    biographySections.forEach(section => {
      initialState[section.id] = false;
    });
    return initialState;
  });

  const [selectedImageForModal, setSelectedImageForModal] = useState<ImageItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (image: ImageItem) => {
    setSelectedImageForModal(image);
    setIsModalOpen(true);
  };

  // Effect for active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px", // Trigger when section is roughly in the middle of the viewport
        threshold: 0,
      }
    );

    biographySections.forEach((section) => {
      const ref = sectionRefs.current[section.id];
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      biographySections.forEach((section) => {
        const ref = sectionRefs.current[section.id];
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  // Effect for image visibility on scroll
  useEffect(() => {
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisibleImages((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      {
        threshold: 0.3, // Image becomes visible when 30% of it is in view
        rootMargin: "0px 0px -100px 0px", // Adjust as needed for when it should appear
      }
    );

    biographySections.forEach((section) => {
      const ref = imageRefs.current[section.id];
      if (ref) {
        imageObserver.observe(ref);
      }
    });

    return () => {
      biographySections.forEach((section) => {
        const ref = imageRefs.current[section.id];
        if (ref) {
          imageObserver.unobserve(ref);
        }
      });
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-12 font-sans">
      {/* Mobile Menu for small screens */}
      <MobileMenu sections={biographySections} activeSectionId={activeSectionId} />

      {/* Table of Contents for larger screens */}
      <div className="hidden lg:block sticky top-4 w-64 pr-8 pt-20">
        <TableOfContents sections={biographySections} activeSectionId={activeSectionId} />
      </div>

      {/* Main Biography Content */}
      <div className="lg:col-span-1">
        <h1 className="text-6xl font-serif font-bold text-center mb-12 text-foreground leading-tight">
          NG QI HENG Biography
        </h1>

        {biographySections.map((section, index) => (
          <section key={section.id} id={section.id} className="mb-16" ref={(el) => (sectionRefs.current[section.id] = el)}>
            <h2 className="text-4xl font-serif font-semibold mb-6 text-foreground">{section.title}</h2>
            <div className={cn(
              "flex flex-col md:flex-row items-start gap-8",
              index % 2 === 1 ? "md:flex-row-reverse" : "" // Alternate image/text order
            )}>
              {sectionImages[section.id] && (
                <div className="md:w-1/2 flex-shrink-0">
                  <img
                    id={section.id} // Add ID for image observer
                    ref={(el) => (imageRefs.current[section.id] = el)}
                    src={sectionImages[section.id].src}
                    alt={sectionImages[section.id].alt}
                    className={cn(
                      "w-full h-64 object-cover rounded-lg shadow-md cursor-pointer transition-opacity duration-700 ease-in-out",
                      visibleImages[section.id] ? "opacity-100" : "opacity-0"
                    )}
                    onClick={() => handleImageClick(sectionImages[section.id])}
                  />
                </div>
              )}
              <div className="md:w-1/2">
                {section.id === "personal-introduction" && (
                  <>
                    <p className="text-lg leading-relaxed text-muted-foreground mb-4">
                      NG QI HENG <br />
                      Kulai, Johor <br />
                      (+60)137898823 · ngqiheng88@gmail.com
                    </p>
                    <h3 className="text-2xl font-serif font-semibold mb-3 text-foreground">Summary</h3>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      I am a Computer Science undergraduate with great knowledge and interest in software development, algorithms, and database systems by using Java, Python, PHP and web technologies. Obsessed in exploring AI tools, Agentic AI, Machine Learning, Deep Learning and certain new technologies.
                    </p>
                  </>
                )}
                {section.id === "profession-skills" && (
                  <>
                    <h3 className="text-2xl font-serif font-semibold mb-3 text-foreground">Technical Skills</h3>
                    <ul className="list-disc list-inside text-lg leading-relaxed text-muted-foreground mb-4">
                      <li>Microsoft Office (Word, Excel, PowerPoint)</li>
                      <li>Canva</li>
                      <li>Figma</li>
                      <li>MySQL</li>
                      <li>PHP</li>
                      <li>HTML</li>
                      <li>Java</li>
                      <li>CSS</li>
                      <li>Python</li>
                      <li>JupyterLab</li>
                      <li>Matlab</li>
                      <li>ArduinoIDE</li>
                    </ul>
                    <h3 className="text-2xl font-serif font-semibold mb-3 text-foreground">Languages</h3>
                    <ul className="list-disc list-inside text-lg leading-relaxed text-muted-foreground">
                      <li>English: Fluent</li>
                      <li>Malay: Fluent</li>
                      <li>Mandarin: Fluent</li>
                      <li>French: Beginner</li>
                    </ul>
                  </>
                )}
                {section.id === "experience" && (
                  <>
                    <h3 className="text-2xl font-serif font-semibold mb-3 text-foreground">Work Experience</h3>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">Café Waiter <span className="text-base font-normal text-muted-foreground float-right">2018</span></p>
                      <ul className="list-disc list-inside text-lg leading-relaxed text-muted-foreground">
                        <li>Take order, casher, clean the table after used.</li>
                        <li>Understand customer needs, and customize the order based on the requirements.</li>
                      </ul>
                    </div>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">Baby Car Seat Promoter <span className="text-base font-normal text-muted-foreground float-right">2019</span></p>
                      <ul className="list-disc list-inside text-lg leading-relaxed text-muted-foreground">
                        <li>Promote car seat to customers based on the car model and capacity.</li>
                        <li>Understand user age, circumstances, and budget.</li>
                        <li>Suggest suitable and customize model to customer and install on their car.</li>
                      </ul>
                    </div>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">Factory Production Operator (BERICAP Sdn Bhd) <span className="text-base font-normal text-muted-foreground float-right">2020</span></p>
                      <ul className="list-disc list-inside text-lg leading-relaxed text-muted-foreground">
                        <li>Learn procedure to operate a production line based on the machine specification.</li>
                        <li>Solve the congestion when the machine production line is stuck.</li>
                        <li>Assemble the product and pack it into pallet to transport.</li>
                        <li>Refill the raw material when the machine is running out of materials to produce.</li>
                      </ul>
                    </div>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">Dessert Shop Waiter <span className="text-base font-normal text-muted-foreground float-right">2021</span></p>
                      <ul className="list-disc list-inside text-lg leading-relaxed text-muted-foreground">
                        <li>Serve the dessert to the customer according to the dessert set they purchased.</li>
                        <li>Ensure the materials always enough before the day start.</li>
                      </ul>
                    </div>
                  </>
                )}
                {section.id === "involvement" && (
                  <>
                    <h3 className="text-2xl font-serif font-semibold mb-3 text-foreground">Curricular Activity</h3>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">Reserve Officer Training Unit (ROTU) <span className="text-base font-normal text-muted-foreground float-right">2023 - Present</span></p>
                      <ul className="list-disc list-inside text-lg leading-relaxed text-muted-foreground">
                        <li>Been through three years training as an Air force reserve officer cadet.</li>
                        <li>Follow the orders strictly and execute it with full of compliance.</li>
                      </ul>
                    </div>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">Malaysia Independence Day Parade in Putrajaya Square <span className="text-base font-normal text-muted-foreground float-right">31st August 2025</span></p>
                      <ul className="list-disc list-inside text-lg leading-relaxed text-muted-foreground">
                        <li>Performed in the form of a parade to pay respect to national leaders and royalty.</li>
                      </ul>
                    </div>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">Facilitator in TVET Camp Programme – SK Taman Bukit Maluri <span className="text-base font-normal text-muted-foreground float-right">September 2025</span></p>
                      <ul className="list-disc list-inside text-lg leading-relaxed text-muted-foreground">
                        <li>Assisted in delivering STEM and TVET workshops to primary students, encourage and enlighten students to involve in the technical field and innovation.</li>
                      </ul>
                    </div>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">Participant in Semarak Patriotik Programme for Higher Education Institutions (IPT) <span className="text-base font-normal text-muted-foreground float-right">2022</span></p>
                      <ul className="list-disc list-inside text-lg leading-relaxed text-muted-foreground">
                        <li>Performed a patriotic dance in the national-level program to encourage and foster patriotism among higher education students.</li>
                      </ul>
                    </div>
                  </>
                )}
                {section.id === "qualification" && (
                  <>
                    <h3 className="text-2xl font-serif font-semibold mb-3 text-foreground">Education</h3>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">Bachelor of Computer Science (Artificial Intelligence) with Honour <span className="text-base font-normal text-muted-foreground float-right">2023 - Present</span></p>
                      <p className="text-lg leading-relaxed text-muted-foreground">National Defence University of Malaysia (NDUM), Kuala Lumpur</p>
                      <ul className="list-disc list-inside text-lg leading-relaxed text-muted-foreground">
                        <li>CGPA: 3.84</li>
                      </ul>
                    </div>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">Foundation in Engineering and Technology <span className="text-base font-normal text-muted-foreground float-right">2022</span></p>
                      <p className="text-lg leading-relaxed text-muted-foreground">National Defence University of Malaysia (NDUM), Kuala Lumpur</p>
                    </div>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">Sijil Pelajaran Malaysia (SPM) <span className="text-base font-normal text-muted-foreground float-right">2021</span></p>
                      <p className="text-lg leading-relaxed text-muted-foreground">SMK Sultan Ibrahim, Kulai, Johor.</p>
                      <ul className="list-disc list-inside text-lg leading-relaxed text-muted-foreground">
                        <li>6A, 3B, 1C</li>
                      </ul>
                    </div>
                    <h3 className="text-2xl font-serif font-semibold mb-3 text-foreground">Certificates</h3>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">MATLAB@UCL</p>
                      <ul className="list-disc list-inside text-lg leading-relaxed text-muted-foreground">
                        <li>MATLAB Onramp</li>
                      </ul>
                    </div>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">TOP CODERS</p>
                      <ul className="list-disc list-inside text-lg leading-relaxed text-muted-foreground">
                        <li>Completion of the Top Coders Malaysia 2025 Coding Challenge Pre Competition Workshop on Python Programming Fundamentals</li>
                      </ul>
                    </div>
                  </>
                )}
                {section.id === "self-development" && (
                  <>
                    <h3 className="text-2xl font-serif font-semibold mb-3 text-foreground">Achievements & Recognition</h3>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">4th Place in Top Coders Coding Challenge 2024 organized by Data Science Association <span className="text-base font-normal text-muted-foreground float-right">2024</span></p>
                      <ul className="list-disc list-inside text-lg leading-relaxed text-muted-foreground">
                        <li>Top five cases Solver</li>
                      </ul>
                    </div>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">Bronze Medal Innovation In Teaching and Learning Expo (INTELEX) <span className="text-base font-normal text-muted-foreground float-right">2024</span></p>
                      <ul className="list-disc list-inside text-lg leading-relaxed text-muted-foreground">
                        <li>Tax Declaration System (TaxPro) on GUI Design.</li>
                      </ul>
                    </div>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">Gold Medal Pre-University Matriculation Innovation Competition (PITRAM) <span className="text-base font-normal text-muted-foreground float-right">2023</span></p>
                      <ul className="list-disc list-inside text-lg leading-relaxed text-muted-foreground">
                        <li>Project of topic ‘Biodegradable Plastic’.</li>
                      </ul>
                    </div>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">Gold Medal Pusat Asasi Pertahanan Innovation Competition 2022 (PAPIC) <span className="text-base font-normal text-muted-foreground float-right">2022</span></p>
                      <ul className="list-disc list-inside text-lg leading-relaxed text-muted-foreground">
                        <li>Project of topic ‘Biodegradable Plastic’.</li>
                      </ul>
                    </div>
                    <h3 className="text-2xl font-serif font-semibold mb-3 text-foreground">Projects</h3>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">Automated External Defibrillator (AED) Usage and Maintenance Monitor System</p>
                      <p className="text-lg leading-relaxed text-muted-foreground mb-2">JavaScript | HTML | CSS | Node.js</p>
                      <ul className="list-disc list-inside text-lg leading-relaxed text-muted-foreground">
                        <li>Developed a smart and easy access system to approach the AED service in the surrounding of any circumstances.</li>
                        <li>Organize administrative on AED’s management and maintenance to ensure the condition and readiness of AED.</li>
                      </ul>
                    </div>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">Database Management System – Book Ordering System</p>
                      <p className="text-lg leading-relaxed text-muted-foreground mb-2">Java | PHP | MySQL | HTML</p>
                      <ul className="list-disc list-inside text-lg leading-relaxed text-muted-foreground">
                        <li>Create database connect to the frontend interface to provide user services.</li>
                      </ul>
                    </div>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">Student Check IN & OUT system</p>
                      <p className="text-lg leading-relaxed text-muted-foreground mb-2">Java</p>
                      <ul className="list-disc list-inside text-lg leading-relaxed text-muted-foreground">
                        <li>Developed a data entry system for student to enter their matric number and record in the system whenever they went out or in the campus.</li>
                      </ul>
                    </div>
                    <div className="mb-6">
                      <p className="font-semibold text-xl text-foreground">Tax Declaration System GUI Design and Modelling</p>
                      <p className="text-lg leading-relaxed text-muted-foreground mb-2">Figma</p>
                      <ul className="list-disc list-inside text-lg leading-relaxed text-muted-foreground">
                        <li>Interactive and interesting user interface design to enhance the declaration system and reduce the manual processing.</li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>

      {selectedImageForModal && (
        <ImageModal
          src={selectedImageForModal.src}
          alt={selectedImageForModal.alt}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default Biography;
import React from 'react'
import {Container,Carousel, Row,Col, Card,ListGroup} from "react-bootstrap";
import { GiHeartOrgan,GiKneeCap,GiRibbon,GiStomach,GiHeartPlus,GiBrain,GiBigGear,GiMedicines } from "react-icons/gi";
function HomePage() {
    return (
        <div id="home">
            <Carousel fade>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://mumbaimirror.indiatimes.com/photo/76824442.cms"
                    alt="First slide"
                    style={{height:"60vh"}}
                    />
                    <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://kdahweb-static.kokilabenhospital.com/kdah-2019/slider/16061129178200.jpg"
                    alt="Second slide"
                    style={{height:"60vh"}}
                    />

                    <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://www.healthcareitnews.com/sites/hitn/files/Hospital-HITN.jpg"
                    alt="Third slide"
                    style={{height:"60vh"}}
                    />

                    <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                </Carousel>
                
                <Container fluid className="IconRow">
                    <Container>
                    <br/>
                    <Row >
                    {/* <Card style={{ width: '18rem' }}>
                        <Card.Header style={{backgroundColor:"#0000FF",color:"white"}}>Featured</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Cras justo odio</ListGroup.Item>
                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                        </ListGroup>
                    </Card> */}
                    <Col xs={6} md={3} style={{backgroundColor:"#7373A8"}} className="IconCol"><a className="medlinks" href="/#heart"><br/><GiHeartOrgan className="Icons"/><br/><h3>Heart</h3><br/></a></Col>
                    <Col xs={6} md={3} style={{backgroundColor:"#206f6d"}} className="IconCol"><a className="medlinks" href="/#ortho"><br/><GiKneeCap className="Icons"/><br/><h3>Orthopedics</h3><br/></a></Col>
                    <Col xs={6} md={3} style={{backgroundColor:"#e51937"}} className="IconCol"><a className="medlinks" href="/#cancer"><br/><GiRibbon className="Icons"/><br/><h3>Cancer Care</h3><br/></a></Col>
                    <Col xs={6} md={3} style={{backgroundColor:"#7ac143"}} className="IconCol"><a className="medlinks" href="/#bariatric"><br/><GiStomach className="Icons"/><br/><h3>Bariatric Surgery</h3><br/></a></Col>
                    <Col xs={6} md={3} style={{backgroundColor:"#237d9e"}} className="IconCol"><a className="medlinks" href="/#critical"><br/><GiHeartPlus className="Icons"/><br/><h3>Critical Care</h3><br/></a></Col>
                    <Col xs={6} md={3} style={{backgroundColor:"#164ebe"}} className="IconCol"><a className="medlinks" href="/#neuro"><br/><GiBrain className="Icons"/><br/><h3>Neurosurgery</h3><br/></a></Col>
                    <Col xs={6} md={3} style={{backgroundColor:"#224855"}} className="IconCol"><a className="medlinks" href="/#robotics"><br/><GiBigGear className="Icons"/><br/><h3>Robotics</h3><br/></a></Col>
                    <Col xs={6} md={3} style={{backgroundColor:"#fdba2f"}} className="IconCol"><a className="medlinks" href="/#medicine"><br/><GiMedicines className="Icons"/><br/><h3>Preventive Medicines</h3><br/></a></Col>
                    </Row>
                    <br/>
                    </Container>
                </Container>
                <Container fluid style={{margin:"0px",padding:"0px"}}>
                    <div style={{backgroundColor:"#7373a8",color:"white"}}>
                    <br id="heart"/><br/><br/>
                    <h2 style={{marginLeft:"20px"}}>Heart</h2>
                    <Row style={{padding:"20px"}}>
                        <Col >
                            <img src="https://cdn.apollohospitals.com/dev-apollohospitals/2021/04/instituteexpertises.jpg" width="100%" />
                        </Col>
                        <Col>
                        <h4>Highlights</h4>
                        <p>We have vast experience in the most complicated coronary artery bypass surgery, surgery for all types of valvular heart diseases, paediatric heart surgery, adult and paediatric heart transplantation with success rates comparable to international standards. We have been rated as the best heart surgery hospitals in India time and again through various prestigious surveys. Over 99.6% of our cardiac bypass surgeries are Beating Heart surgeries which ensure quicker and easier post-operative recovery. Our cardiologists are pioneers in Coronary Artery Stenting, Laser Angioplasty and in techniques as advanced as Percutaneous Transluminal Septal Myocardial Ablation. Our heart transplantation programme is one of the most successful in the country.</p>
                        </Col>
                    </Row>
                    </div>
                    
                    <div style={{backgroundColor:"white",color:"black"}}>
                    <br id="ortho"/><br/><br/>
                    <h2 style={{marginLeft:"20px"}}>Orthopedics</h2>
                    <Row style={{padding:"20px"}}>
                        <Col>
                        <h4>Highlights</h4>
                        <p>Our Orthopedicians trained at the top centres worldwide, bring with them the latest and best techniques and work in our facilities that have the latest cutting edge technology in terms of equipments, operating rooms, recovery areas and advanced Physical therapy facilities. We have dedicated & well equipped Orthopedic surgery complexes with laminar flow & various modern equipment like image intensifier, operating microscope, computer navigation system, top of the line arthroscopy system etc.Shoulder surgeries and the most delicate hand micro surgeries are all performed with great precision and expertise.We perform bone and joint replacement surgeries which include the most current Arthroscopic and Reconstructive techniques. Joint replacements including hip resurfacing and knee replacement surgery [primary, complex primary & revision replacements] are being done in large numbers with excellent outcomes.Cartilage regeneration surgery, including micro-fracturing, mosaic-plasty are all performed. The Apollo Cartilage School is leveraging developments in Orthobiologicals and growth factors to herald a new age of regenerative medicine. 
                        </p>
                        </Col>
                        <Col >
                            <img src="https://healthblog.uofmhealth.org/sites/consumer/files/2019-01/cartilagehealth-img.jpg" width="100%" />
                        </Col>
                    </Row>
                    </div>

                    <div style={{backgroundColor:"#e51937",color:"white"}}>
                    <br id="cancer"/><br/><br/>
                    <h2 style={{marginLeft:"20px"}}>Cancer Care</h2>
                    <Row style={{padding:"20px"}}>
                        <Col >
                            <img src="https://cdn.apollohospitals.com/dev-apollohospitals/2020/11/apollo-precise-diagnostic.jpg" width="100%" />
                        </Col>
                        <Col>
                        <h4>Highlights</h4>
                        <p>
                        Today, Cancer care has undergone a paradigm shift and is all about comprehensive care, which requires commitment, expertise and an indomitable spirit. It also demands innovation and a fresh way of thinking. We have under one roof, the best minds in Cancer.Radiology and imaging sciences are key facets in the delivery of high end diagnostics in cancer care. Our continuous innovation and development in these vital fields have had tremendous positive impact in the fight against cancer.
                        </p>
                        </Col>
                    </Row>
                    </div>

                    <div style={{backgroundColor:"white",color:"black"}}>
                    <br id="critical"/><br/><br/>
                    <h2 style={{marginLeft:"20px"}}>Critical Care</h2>
                    <Row style={{padding:"20px"}}>
                        <Col>
                        <h4>Highlights</h4>
                        <p>
                        Critical care or Intensive care is a crucial medical specialty caring for patients who are critically ill. They may require support for instability (hypertension/hypotension), airway or respiratory compromise (ventilator support), acute renal failure, cardiac arrhythmias, or the cumulative effects of multiple organ failure, more commonly referred to now as multiple organ dysfunction syndrome. Patients needing intensive/invasive monitoring, such as in the crucial hours after major surgery or patients who are considered too unstable to transfer to a less intensively monitored unit may also be placed in the intensive care units.
                        </p>
                        </Col>
                        <Col >
                            <img src="https://cdn.apollohospitals.com/dev-apollohospitals/2021/04/icu.jpg" width="100%" />
                        </Col>
                    </Row>
                    </div>

                    <div style={{backgroundColor:"#7ac143",color:"white"}}>
                    <br id="bariatric"/><br/><br/>
                    <h2 style={{marginLeft:"20px"}}>Bariatric Surgery</h2>
                    <Row style={{padding:"20px"}}>
                        <Col >
                            <img src="https://cdn.apollohospitals.com/dev-apollohospitals/2020/09/Bariatics.png" width="100%" />
                        </Col>
                        <Col>
                        <h4>Highlights</h4>
                        <p>
                        Obesity is a condition where a person’s Body Mass Index or BMI (calculated by dividing height by weight) is more than 30. It is becoming a global epidemic not only in developed nations but also in developing nations like India. Obesity is a huge issue in India too, with morbid obesity affecting 5% of the country’s population.Bariatric Surgery Doctors in India adopt a variety of procedures for patients who have morbid obesity. Weight loss is achieved by reducing the size of the stomach with a gastric band or through removal of a portion of the stomach (sleeve gastrectomy or biliopancreatic diversion with duodenal switch) or by resecting and re-routing the small intestine to a small stomach pouch (gastric bypass surgery).
                        Bariatric procedures including Gastric Band, Sleeve Gastrectomy, Gastric Bypass, Mini Gastric Bypass, Bilio-pancreatic diversion, and metabolic surgeries routinely done. Minimal access techniques done, including Endoscopic surgery, Laparoscopy, Single incision surgery & robotic surgery for Bariatrics.First weight loss hospital in India to introduce Robotic technique for Bariatrics
                        </p>
                        </Col>
                    </Row>
                    </div>

                    <div style={{backgroundColor:"white",color:"black"}}>
                    <br id="neuro"/><br/><br/>
                    <h2 style={{marginLeft:"20px"}}>Neurosurgery</h2>
                    <Row style={{padding:"20px"}}>
                        <Col>
                        <h4>Highlights</h4>
                        <p>
                        Neurosurgery a branch of surgery involved with the brain injury, spine and nerves, is a key specialty at Apollo hospitals. Our neurosurgery doctors treat neurological diseases such as brain injury or diseases, head injury, spinal injury, brain tumors, spinal tumors, brain hemorrhage, hydrocephalus, nerve injuries, tumors, disc prolapse or herniation, spinal dislocation, unstable spine, congenital malformations like atlanto-axial dislocation, spinal dysraphism etc. Treatment of seizures or epilepsy as well as modern treatments for movement disorders like Parkinson’s disease are further specializations. More than 1000 major neurosurgeries are being carried out every year. Our neurologists will check for complex neurology diseases and conditions of the patient and provide treatment based on the observation. Today, Neuroanaesthesia, Neurosurgical intensive care and Neuro-imaging technology have advanced so much that mortality has significantly reduced and functional outcomes have improved tremendously. Minimally invasive techniques help decrease the mortality and morbidity associated with surgery. With a team led by some of the best neurosurgeons in India, preservation of all functions, good cosmetic outcome, shorter hospital stay and avoiding pain and discomfort are considered as important as saving a patient’s life. The integrated team of neurologists, neurosurgeons, neuroanesthetists, neuro physicians and intensivists along with rehabilitation specialists are dedicated to this goal.
                        </p>
                        </Col>
                        <Col >
                            <img src="https://cdn.apollohospitals.com/dev-apollohospitals/2021/04/neurosurgery.jpg" width="100%" />
                        </Col>
                    </Row>
                    </div>

                    <div style={{backgroundColor:"#224855",color:"white"}}>
                    <br id="robotics"/><br/><br/>
                    <h2 style={{marginLeft:"20px"}}>Robotics</h2>
                    <Row style={{padding:"20px"}}>
                        <Col >
                            <img src="https://cdn.apollohospitals.com/dev-apollohospitals/2021/04/robotics-surgery_v2.jpg" width="100%" />
                        </Col>
                        <Col>
                        <h4>Highlights</h4>
                        <p>Robotic Surgery is a method to perform surgery using very small tools attached to a robotic arm. The surgeon controls the robotic arm with a computer. The surgeon sits at a computer station and directs the movements of a robot. Small surgical tools are attached to the robot’s arms. Surgery can be performed through smaller cuts than open surgery. The small, precise movements that are possible with this type of surgery give it huge advantages over standard surgical techniques. This can allow the surgeon to do a procedure through a small cut that could be done before only with open surgery.The state-of-the-art operating theatres are equipped with the da Vinci® surgical system, the most advanced platform for minimally invasive surgery available today. The four-armed surgical robotic system is a breakthrough in surgical technology and is used in the specialties of Urology, Gynaecology, Cardiac, Gastrointestinal surgery, Bariatrics and Paediatrics. Robotic surgery for treatment of prostate, kidney and urinary bladder cancer has proved to be highly beneficial to patients. Another kind of robotic technology we use at Apollo Hospitals, India is the Renaissance Robotic Technology, which is the only technology specifically designed for spine surgery. Apollo hospitals is the first in Asia-Pacific to offer this surgical guidance system, which is a minimally-invasive robotic-guided spine surgery system.

                        </p>
                        </Col>
                    </Row>
                    </div>

                    <div style={{backgroundColor:"white",color:"black"}}>
                    <br id="medicine"/><br/><br/>
                    <h2 style={{marginLeft:"20px"}}>Preventive Medicine</h2>
                    <Row style={{padding:"20px"}}>
                        <Col>
                        <h4>Highlights</h4>
                        <p>
                        Medicine is the art, science, and practice of caring for a patient and managing the diagnosis, prognosis, prevention, treatment or palliation of their injury or disease. Medicine encompasses a variety of health care practices evolved to maintain and restore health by the prevention and treatment of illness. Contemporary medicine applies biomedical sciences, biomedical research, genetics, and medical technology to diagnose, treat, and prevent injury and disease, typically through pharmaceuticals or surgery, but also through therapies as diverse as psychotherapy, external splints and traction, medical devices, biologics, and ionizing radiation, amongst others. Medicine has been practiced since prehistoric times, during most of which it was an art (an area of skill and knowledge) frequently having connections to the religious and philosophical beliefs of local culture. For example, a medicine man would apply herbs and say prayers for healing, or an ancient philosopher and physician would apply bloodletting according to the theories of humorism. In recent centuries, since the advent of modern science, most medicine has become a combination of art and science (both basic and applied, under the umbrella of medical science). While stitching technique for sutures is an art learned through practice, the knowledge of what happens at the cellular and molecular level in the tissues being stitched arises through science. 
                        </p>
                        </Col>
                        <Col >
                            <img src="https://www.apollohospitals.com/wp-content/uploads/2020/11/great-health-secret-3.jpg" width="100%" />
                        </Col>
                    </Row>
                    </div>
                </Container>
        </div>
    )
}

export default HomePage

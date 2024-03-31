<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductsController extends Controller
{

    public function index($product)
    {
        $data = [
            'product1' => [
                'array' => [
                    [
                        'index' => 1,
                        'pics' => [
                            'img1' => '../images/shoe1.png',
                            'img2' => '../images/shoe2.png',
                            'img3' => '../images/shoe3.png',
                            'img4' => '../images/shoe4.png',
                        ],
                        'title' => "Adidas Forum Mid",
                        'brand' => "../images/brands/Adidas_logo.png",
                        'size' => "40,41,42,43,44,45",
                        'label' => "-40%",
                        'short_description' => "<h5>Descriere</h5>
                        <span>Materiale Folosite</span> <br />
                        <ul>
                            <li>Piele</li>
                            <li>Sintetic</li>
                            <li>Cauciuc</li>
                        </ul>
                        <p>Culoare: Maro</p>
                        ",
                        'price' => "100 RON",
                        "long_description" => "<h3>Adidas Forum MID</h3>
                        <p>
                            Din fericire, lumea a pierdut versiunile adidas Forum pentru doar câțiva
                            ani. Simbolizat de estetica curată adidas, cele trei dungi contrastante de
                            pe lateral și cureaua iconică de tip pull-on. Acum, modelul s-a întors, iar
                            acesta vine în trei versiuni de-a dreptul. Pe lângă varianta MID, care
                            ajunge până la gleznă și este perfectă pentru toamnă, poți alege și varianta
                            mai înaltă HI sau cea mai joasă, numită LOW. Așadar, descoperă acest clasic
                            și adu o bucată de istorie mid în dulapul tău de pantofi.
                        </p>
                        <h5>Materiale</h5>
                        <h6>Exterior</h6>
                        <ul>
                            <li>
                                Piele: probabil cel mai bun material pentru încălțăminte: își menține
                                forma, este respirabilă și are o grămadă de alte avantaje.
                            </li>
                            <li>
                                Sintetic: spre deosebire de textil, fibrele sintetice sunt mai
                                puternice, mai durabile, și se usucă rapid.
                            </li>
                        </ul>
                        <h6>Talpa exterioara</h6>
                        <ul>
                            <li>
                                Cauciuc: un material ușor de întreținut, apreciat mai ales pe vreme
                                ploioasă.
                            </li>
                        </ul>
                        ",
                        "brand_text" => "<h3>Adidas Originals</h3>
                        <p>
                            Moștenirea, istoria și legenda care a creat întreaga cultură din jurul
                            sneakerșilor. adidas Originals domină teritoriul modei de zeci de ani. De
                            ce? Deoarece în spatele progresului constant stau calitatea dovedită,
                            materiale fiabile și inovație, deghizate în tot ce are mai bun de oferit
                            trecutul.
                        </p>
                        <p>Cei mai populari sneakerși cu trei dungi</p>
                        <p>
                            Istoria adidas a început în 1948. Sneakerșii adidas sunt caracterizați de
                            legendarele trei dungi, sau trifoiul, în cazul subdiviziei adidas Originals
                            - care este un segment al brandului adidas ce produce în principal
                            încălțăminte vintage și retro. Prin urmare, nu este o coincidență faptul că
                            sub categoria de sneakerși adidas Originals vei găsi, de exemplu, adidas
                            Superstar vechi de peste 50 de ani, cunoscuții adidas NMD sau variantele pe
                            alb sau negru ale siluetelor adidas Stan Smith sau Deerupt.
                        </p>
                        <p>Unde porți sneakerșii adidas Originals?</p>
                        <p>
                            Găsești pe site-ul nostru încălțăminte adidas Originals într-o varietate de
                            stiluri. După o scurtă cercetare, vei descoperi că se potrivesc oricărei
                            ocazii. Depinde unde vrei să îi porți. În oferta noastră vei găsi sneakerși
                            pentru tenis, pentru exterior sau sneakerși pentru skating. Și bineînțeles
                            nu putem uita și de ultra-confortabilii adidas Slippers.
                        </p>
                        <p>
                            Sneakerșii au jucat întotdeauna un rol important în domeniul streetwear și
                            al modei, în general. Prin urmare, profită de selecția atentă a tuturor
                            perechilor de adidas Originals de pe Footshop și alege-o pe a ta.
                        </p>
                        
                    ",
                    ],

                ],
            ],
        ];

        if (!isset($data[$product])) {
            abort(404);
        }

        return Inertia::render('Product', [
            'array' => $data[$product]['array'],
        ]);
    }
}

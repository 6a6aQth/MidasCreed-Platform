import { createProspect } from "../actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewProspectPage() {
    return (
        <div className="flex flex-col gap-6 max-w-2xl">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/prospects" className="text-muted-foreground hover:text-primary">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">New Prospect</h1>
                    <p className="text-muted-foreground">Add a new prospect to your pipeline.</p>
                </div>
            </div>

            <div className="rounded-md border bg-card p-6">
                <form action={createProspect} className="flex flex-col gap-4">
                    <div className="grid gap-2">
                        <label htmlFor="name" className="text-sm font-medium">Name / Company Name *</label>
                        <input id="name" name="name" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <label htmlFor="tier" className="text-sm font-medium">Tier *</label>
                            <select id="tier" name="tier" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                <option value="malawi_simple">Malawi Simple</option>
                                <option value="african_medium">African Medium</option>
                                <option value="international_high_end">International High-End</option>
                            </select>
                        </div>

                        <div className="grid gap-2">
                            <label htmlFor="source" className="text-sm font-medium">Source *</label>
                            <select id="source" name="source" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                <option value="sourced">Sourced</option>
                                <option value="referral">Referral</option>
                                <option value="existing_client">Existing Client</option>
                                <option value="cold">Cold Outreach</option>
                                <option value="inbound">Inbound</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <label htmlFor="sector" className="text-sm font-medium">Sector</label>
                            <input id="sector" name="sector" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="country" className="text-sm font-medium">Country</label>
                            <select id="country" name="country" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                                <option value="">— Select country —</option>
                                <option value="Malawi">🇲🇼 Malawi</option>
                                <optgroup label="Africa">
                                    <option value="Angola">Angola</option>
                                    <option value="Botswana">Botswana</option>
                                    <option value="Cameroon">Cameroon</option>
                                    <option value="Côte d'Ivoire">Côte d&apos;Ivoire</option>
                                    <option value="DR Congo">DR Congo</option>
                                    <option value="Egypt">Egypt</option>
                                    <option value="Ethiopia">Ethiopia</option>
                                    <option value="Ghana">Ghana</option>
                                    <option value="Kenya">Kenya</option>
                                    <option value="Mozambique">Mozambique</option>
                                    <option value="Namibia">Namibia</option>
                                    <option value="Nigeria">Nigeria</option>
                                    <option value="Rwanda">Rwanda</option>
                                    <option value="Senegal">Senegal</option>
                                    <option value="South Africa">South Africa</option>
                                    <option value="Tanzania">Tanzania</option>
                                    <option value="Uganda">Uganda</option>
                                    <option value="Zambia">Zambia</option>
                                    <option value="Zimbabwe">Zimbabwe</option>
                                </optgroup>
                                <optgroup label="Rest of World">
                                    <option value="Australia">Australia</option>
                                    <option value="Canada">Canada</option>
                                    <option value="China">China</option>
                                    <option value="France">France</option>
                                    <option value="Germany">Germany</option>
                                    <option value="India">India</option>
                                    <option value="Japan">Japan</option>
                                    <option value="Netherlands">Netherlands</option>
                                    <option value="Singapore">Singapore</option>
                                    <option value="Sweden">Sweden</option>
                                    <option value="Switzerland">Switzerland</option>
                                    <option value="United Arab Emirates">United Arab Emirates</option>
                                    <option value="United Kingdom">United Kingdom</option>
                                    <option value="United States">United States</option>
                                    <option value="Other">Other</option>
                                </optgroup>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <label htmlFor="fitScore" className="text-sm font-medium">Fit Score (0-5)</label>
                            <input type="number" id="fitScore" name="fitScore" min="0" max="5" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="signalScore" className="text-sm font-medium">Signal Score (0-5)</label>
                            <input type="number" id="signalScore" name="signalScore" min="0" max="5" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
                        </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                        <button type="submit" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                            Create Prospect
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
